<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove" v-show="food.count" @click.stop="updateFoodCount(false)"></div> 
    </transition> 
    <div class="cart-count" v-show="food.count">{{food.count}}</div> 
    <div class="iconfont icon-jia-tianchong" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    updateFoodCount(isAdd) {
      // const {food} = this
      // 通知action 更新
      this.$store.dispatch('updateFoodCount',{food:this.food,isAdd})
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .icon-remove
      display: inline-block 
      padding 5px 
      line-height 22px 
      font-size 22px 
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform  translateX(18px) rotate(180deg)
    .cart-count
      display: inline-block 
      vertical-align: top 
      width: 12px 
      padding-top: 5px 
      line-height: 22px 
      text-align: center 
      font-size: 10px 
      color: rgb(147, 153, 159)
    .icon-jia-tianchong
      display: inline-block 
      padding: 5px 
      line-height: 22px 
      font-size: 22px 
      color $green
</style>