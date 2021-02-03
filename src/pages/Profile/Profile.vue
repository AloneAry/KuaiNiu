<template>
  <div class="profile">
    <HeaderTop title="我的"></HeaderTop>
    <section class="profile_number border-1px">
      <router-link to="/login" class="profile_link">
        <div class="profile_image">
          <i class="iconfont icon-geren1 icon_person"></i>
        </div>
        <div class="user_info">
          <p class="user-info-top">登录/注册</p>
          <p>
            <span class="user_icon">
              <i class="iconfont icon-shouji icon_modile"></i>
            </span>
            <span class="icon_mobile_number">暂无绑定手机号</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantouyou"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <div class="info_data_list">
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </div>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-dingdan"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantouyou"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantouyou"></i>
          </span>
        </div>
      </a>
      <!-- 会员中心 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-huiyuanquanyi"></i>
        </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantouyou"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-qiyebangonglou border-1px"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantouyou"></i>
          </span>
        </div>
      </a>
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
  @import "../../common/stylus/mixins.styl"
  .profile 
    width 100%
    overflow hidden
    .profile_number
      margin-top 45.5px
      top-border-1px(#f1f1f1)
      .profile_link
        clearFix()
        position relative
        display block
        background #02a774
        padding 20px 10px
        .profile_image
          float left 
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon_person
            background #e4e4e4
            font-size 62px
      .user_info
        float left 
        margin-top 8px
        margin-left 15px
        p
          font-weight 700
          font-size 18px
          color #ffffff
          &.user-info-top
            margin-bottom 8px
          .user_icon
            display inline-block
            margin-right -10px
            width 20px
            height 20px
            .icon_modile
              font-size 20px
              vertical-align  text-top 
          .icon_mobile_number
              font-size 14px
              color #ffffff
      .arrow
        width 12px
        height 12px
        position absolute
        right 10px
        align-items center
        bottom 47px 
        color white
    .profile_info_data
      bottom-border-1px(#e4e4e4)
      width 100%
      background #ffffff
      overflow hidden
      .info_data_list
        clearFix()
        .info_data_link
          float left 
          width 33%
          text-align center
          border-right 1px solid #f1f1f1
          .info_data_top
            display block
            width 100%
            font-size 14px
            color #333
            padding 15px 5px 10px
            span 
              display inline-block
              font-size 30px
              color #ff9900
              font-weight 700
              line-height 30px
          .info_data_bottom
            display inline-block
            font-size 14px
            color #666
            font-weight 400
            padding-bottom 10px
        .info_data_link:nth-of-type(2)
          .info_data_top
            span 
              color #ff5f3e
        .info_data_link:nth-of-type(3)
          border 0
          .info_data_top
            span 
              color #6ac20b
    .profile_my_order
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #ffffff
      .my_order
        display flex
        align-items center
        padding-left 15px
        >span 
          diaplay flex 
          align-items center
          width 20px
          height 20px
          >.iconfont
            margin-left -10px
            font-size 24px
          .icon-dingdan
            color #02a774
          .icon-jifen
            color #ff5f3e
          .icon-huiyuanquanyi
            color #ff9900
          .qiyebangonglou
            color #02a774
      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333 
        >span:nth-of-type(2)
          float right
          width 10px
          height 10px
          color #bbb
</style>