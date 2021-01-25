<template>
  <!--首页头部-->
      <div>
        <header class="header">
          <slot name="left"></slot>
          <span class="header_title">
            <span class="header_title_text">{{title}}</span>
          </span>
          <slot name="right"></slot>
        </header>
      </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .header
      background-color #02a774
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px  
          color #ffffff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        width 50%
        color #ffffff
        text-align center
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        .login_reg_text
          color #ffffff
          font-size 20px
          display block
      .header_login_reg
        position absolute
        font-size 14px
        right 15px
        top 50%
        transform translateY(-50%)
        .login_reg_text
          color #ffffff
</style>