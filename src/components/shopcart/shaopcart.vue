<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right" :class="payenough">
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
  </div>
</template>

<script>
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
          }
        ],
        dropBalls: []
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
      }
    },
    methods: {
      drop (el) {

      }
    }
  };
</script>

<style lang="less">
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:  48px;
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
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
        }
      }
    }
  }
</style>
