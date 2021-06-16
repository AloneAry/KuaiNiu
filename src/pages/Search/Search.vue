<template>
  <section class="search">
    <!-- <header class="header"> -->
    <HeaderTop title="搜索"/> 
      <!-- <a class="header_title"> 
        <span class="header_title_text ellipsis">搜索</span> 
      </a>  -->
    <!-- </header> -->
    <form class="search_form" @submit.prevent="search"> 
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword"> 
      <input type="submit" class="search_submit"> 
    </form>
    <section class="list"  v-if="!nosearchshops">
      <ul class="list_container">
        <!-- <li class="list_li">
          <section class="item_left"> 
            <img :src="baseImageUrl + searchshop.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p><span>{{searchshop.name}}</span></p>
              <p>月售 {{searchshop.rating_count}} 单</p>
              <p>{{searchshop.float_minimum_order_amount}}元起送 / 距离 {{searchshop.distance}} 公里</p>
            </div>
          </section>
        </li> -->
        <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left"> 
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img"> 
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p><span>{{item.name}}</span> </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}}</p>
            </div>
          </section>
        </router-link>

      </ul>
    </section>
    <section  class="search_one" v-else>抱歉，未查到相关结果</section>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import {mapState} from 'Vuex'


  export default {
    data() {
      return {
        keyword: '',
        imgBaseUrl: "https://fuss10.elemecdn.com",
        nosearchshops: false
      }
    },
    computed: {
      ...mapState(['searchShops'])
    },

    methods: {
      search() { 
        this.nosearchshops = false
        const keyword = this.keyword.trim()

        this.$store.dispatch('getSearchShops',keyword)
      }
    },
    watch: {
      searchShops(value) {
        if(!value.length)(
          this.nosearchshops = true
        )
      }
    },
    components: {
        HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 82%
          border 2px solid #f2f2f2
          font-size 14px
          color #333
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774 
    .list
      .list_container
        background-color #fff
        .list_li
          display flex
          jusitify-content center
          padding 10px
          border-bottom 1px solid $bc
          .item_left
            margin-right 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_one
      margin 0 auto
      color #333
      background-color #fff
      text-align center
      margin-top 0.125rem
      padding 5px


</style>