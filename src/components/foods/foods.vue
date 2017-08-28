<template>
  <div class="foods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      foods: []
    };
  },
  created () {
    this.$http.get('/api/foods').then((res) => {
      res = res.body;
      if (res.errorRet === 0) {
        this.foods = res.data;
        console.log(this.foods);
      }
    });
  }
};
</script>

<style lang="less">
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
    }
    .foods-wrapper{
      flex: 1;
    }
  }
</style>