<template>
  <div class="star" :class="starsize">
    <!-- <span v-for="item in items" :class="itemclass" class="star-item"></span> -->
    <span v-for="(item,index) in items" :class="item" class="star-item" key="index"></span>
  </div>
</template>

<script>
const TOTAL = 5;
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starsize () {
      return 'star-' + this.size;
    },
    items () {
      let arr = [];
      let score = Math.floor(this.score * 2) / 2;       // 3   3.5
      let decimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        arr.push('on');
      }
      if (decimal) {
        arr.push('half');
      }
      while (arr.length < TOTAL) {
        arr.push('off');
      }
      return arr;
    }
  }
};
</script>

<style lang="less">
@import '../../common/less/mixin.less';
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('star48_on');
      }
      &.half {
        .bg-image('star48_half');
      }
      &.off {
        .bg-image('star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('star36_on');
      }
      &.half {
        .bg-image('star36_half');
      }
      &.off {
        .bg-image('star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('star24_on');
      }
      &.half {
        .bg-image('star24_half');
      }
      &.off {
        .bg-image('star24_off');
      }
    }
  }
}
</style>

