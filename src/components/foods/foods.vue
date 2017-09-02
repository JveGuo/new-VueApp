<template>
  <div class="foods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in foods" class="menu-item" :key="index" :class="{'active': currentIndex === index}" @click="select(index)">
          <span class="text border-1px">
            <i class="icon" v-show="item.type > 0" :class="iconImgArr[item.type]"></i>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in foods" :key="index" class="title-item" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" @click="showDetail(food, $event)" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span><span v-show="food.oldPrice" class="old-price">{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="ball-wrapper">
                <numberball @addCount="addFood" :food="food"></numberball>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart ref="shopcart" :selectFood="selectFood" :peisong="seller.deliveryPrice" :minPeisong="seller.minPrice"></shopCart>
    <foodDetail @addCount="addFood" :food="clickedFood" ref="foodDetail"></foodDetail>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCart from '../shopcart/shaopcart';
import numberball from '../numberball/numberball';
import foodDetail from '../fooddetail/fooddetail';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      foods: [],
      listHeight: [],
      scrollY: 0,
      clickedFood: {}
    };
  },
  computed: {
    currentIndex () {
      for (let index of this.listHeight.keys()) {
        let minHeight = this.listHeight[index];
        let maxHeight = this.listHeight[index + 1];
        if (!maxHeight || (this.scrollY >= minHeight && this.scrollY < maxHeight)) {
          return index;
        }
      }
      return 0;
    },
    selectFood () {
      let selectArr = [];
      for (let food of this.foods) {
        for (let item of food.foods) {
          if (item.count) {
            selectArr.push(item);
          }
        }
      }
      return selectArr;
    }
  },
  created () {
    console.log(this.foods);
    this.iconImgArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/foods').then((res) => {
      res = res.body;
      if (res.errorRet === 0) {
        this.foods = res.data;
        // console.log(this.foods);
        this.$nextTick(() => {
          this.initScroll();
          this.calculateHeight();
        });
      }
    });
  },
  methods: {
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    calculateHeight () {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let item of foodList) {
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    select (index) {
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    addFood (target) {
      this._drop(target);
    },
    _drop (target) {
      // 与下落小球动画 异步执行
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    showDetail (food, event) {
      this.clickedFood = food;
      this.$refs.foodDetail.show();
    }
  },
  components: {
    shopCart,
    numberball,
    foodDetail
  }
};
</script>

<style lang="less">
  @import '../../common/less/mixin.less';
  .foods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        font-size: 0;
        &.active{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          font-weight: 700;
          background: #fff;
          .text{
            .border-none();
          }
        }
        &:last-child{
          .text{
            .border-none();
          }
        }
        .text{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image('decrease_3');
            }
            &.discount{
              .bg-image('discount_3');
            }
            &.guarantee{
              .bg-image('guarantee_3');
            }
            &.invoice{
              .bg-image('invoice_3');
            }
            &.special{
              .bg-image('special_3');
            }
          }
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child{
          .border-none();
          margin-bottom: 0;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            margin: 2px 0 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .extra, .description{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .extra{
            .count{
              margin-right: 12px;
            }
          }
          .description{
            margin-bottom: 8px;
            line-height: 12px;
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now-price{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old-price{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
        .ball-wrapper{
          position: absolute;
          bottom: 12px;
          right: 0;
        }
      }
    }
  }
</style>