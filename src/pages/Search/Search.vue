<template>
    <div>
      <HeaderTop title="搜索"></HeaderTop>
      <form action="#" class="search_form">
        <input type="text" name="search" placeholder="请输入商品或美食名称" class="search_input">
        <input type="submit" class="search_submit">
      </form>
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
  @import "../../common/stylus/mixins.styl";
  .search_form
    clearFix()
    margin-top 45px
    background-color #ffffff
    padding 12px 8px
    input 
      height 35px
      padding 0 4px
      border-radius 2px
      outline none 
      &.search_input
        float left 
        width 76%
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        font-size 16px
        color #ffffff
        background-color #02a774


</style>