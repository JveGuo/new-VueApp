<template>
  <div class="numberball">
    <transition name="move">
      <div class="reduce" v-show="food.count>0" @click="reduceCount">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="number" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click="addCount"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
      // console.log(this.food);
    },
    methods: {
      addCount (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('addCount', event.target);
      },
      reduceCount () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less">
  .numberball{
    font-size: 0;
    .reduce{
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: translate3d(0 , 0, 0);
      .icon-remove_circle_outline{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.move-enter-active, &.move-leave-active{
        transition: all 0.4s linear;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .icon-remove_circle_outline{
          transform: rotate(180deg);
        }
      }
    }
    .number{
      display: inline-block;
      font-size: 10px;
      text-align: center;
      width: 12px;
      line-height: 24px;
      vertical-align: top;
      padding-top: 6px;
      color: rgb(147, 153, 159);
    }
    .add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
