<template>
  <div>
    <HeaderTop title="订单列表"></HeaderTop>
    <section class="order_no_login">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <button>立即登录</button>
    </section>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  export default {
    components: {
        HeaderTop
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img 
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    >button 
      display inline-block
      background #02a774
      font-size 14px
      color #ffffff
      border-radius 4px
      border 0
      outline none 
      padding 10px 20px
</style>