<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleShow">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'light': totalCount > 0}">
              <span class="icon-shopping_cart" :class="{'light': totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'light':totalCount>0}">￥{{totalPrice}}</div>
          <div class="peisong">另需配送费￥{{peisong}} 元</div>
        </div>
        <div class="content-right" :class="payenough" @click.stop="goPay">
          {{pay}}
        </div>
      </div>
      <div class="balldrop-wrapper">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFood" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">{{food.price*food.count}}</div>
                <div class="count-wrapper">
                  <numberball @addCount="addFood" :food="food"></numberball>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script>
  import numberball from '../numberball/numberball';
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFood: {
        type: Array,
        default () {
          return [];
        }
      },
      peisong: {
        type: Number,
        default: 0
      },
      minPeisong: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        // 默认 折叠
        fold: true
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        for (let item of this.selectFood) {
          total += item.price * item.count;
        }
        return total;
      },
      totalCount () {
        let total = 0;
        for (let item of this.selectFood) {
          total += item.count;
        }
        return total;
      },
      // 改变起送价格
      pay () {
        if (this.totalPrice === 0) {
          return `￥${this.minPeisong} 起送`;
        } else if (this.totalPrice < this.minPeisong) {
          let money = this.minPeisong - this.totalPrice;
          return `还差￥${money} 起送`;
        } else {
          return `去结算`;
        }
      },
      // 改变背景色
      payenough () {
        if (this.totalPrice < this.minPeisong) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      // 显示隐藏  只有点击后才显示
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          if (!this.listScroll) {
            this.$nextTick(() => {
              this.listScroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            });
          } else {
            this.listScroll.refresh();
          }
        }
        return show;
      }
    },
    methods: {
      // 接收 小球 传来的 target
      drop (el) {
        for (let item of this.balls) {
          if (!item.show) {
            item.show = true;
            item.el = el;
            this.dropBalls.push(item);
            return;
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping (el, done) {
        // 强制刷新
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      addFood (el) {
        this.drop(el);
      },
      toggleShow () {
        if (!this.totalCount) {
          return false;
        }
        this.fold = !this.fold;
      },
      empty () {
        for (let item of this.selectFood) {
          item.count = 0;
        }
      },
      hideList () {
        this.fold = true;
      },
      goPay () {
        if (this.totalPrice < this.minPeisong) {
          return;
        }
        window.alert(`需支付${this.totalPrice}元`);
      }
    },
    components: {
      numberball
    }
  };
</script>

<style lang="less">
  @import '../../common/less/mixin.less';
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:  48px;
    z-index: 50;
    .content{
      display: flex;
      background: #141d27;
      .content-left{
        flex: 1;
        font-size: 0;
        .logo-wrapper{
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          box-sizing: border-box;
          width: 56px;
          height: 56px;
          padding: 6px;
          background: #141d27;
          border-radius: 50%;
          .logo{
            width: 100%;
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            text-align: center;
            &.light{
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart{
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
              &.light{
                color: #fff;
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            color: #fff;
            font-weight: 700;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          font-weight: 700;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.2);
          &.light{
            color: #fff;
          }
        }
        .peisong{
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-left: 12px;
          margin-top: 12px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        &.not-enough{
          color: rgba(255, 255, 255, 0.4);
          background: #2b333b;
        }
        &.enough{
          background: #00b43c;
          color: #fff;
        }
      }
    }
    .balldrop-wrapper{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active{
        transition: all 0.5s;
      }
      &.fold-enter, &.fold-leave-active{
        transform: translate3d(0, 0, 0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title{
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
        .food{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, 0.1));
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .count-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>
