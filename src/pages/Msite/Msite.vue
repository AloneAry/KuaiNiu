<template>
  <div class="msite">
    <!-- 首页头部 -->
    <HeaderTop :title="address.name">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a class="header_login_reg" slot="right">
        <span class="login_reg_text">登录|注册</span>
      </a>
    </HeaderTop>
    <!-- 首页面导航 -->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:;"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
// 引入Swiper组件
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "Vuex";

export default {
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  mounted() {
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },

  computed: {
    ...mapState(["address", "categorys"]),

    /*
    
    */

    categorysArr() {
      const { categorys } = this;

      const arr = [];

      let minArr = [];

      // 遍历categorys
      categorys.forEach((c) => {
        if (minArr.length === 8) {
          minArr = [];
        }

        if (minArr.length === 0) {
          arr.push(minArr);
        }

        minArr.push(c);
      });
      return arr;
    },
  },

  watch: {
    categorys(value) {
      // 界面更新就立即创建swiper对象
      this.$nextTick(() => {
        // 一旦完成界面更新，立即调用（此语句要写在数据更新之后）
        new Swiper(".swiper-container", {
          loop: true, //可以循环轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            // clickable: true,
          },
        });
      });
    },
  },

  components: {
    HeaderTop,
    ShopList,
  },
};
</script>

<style lang="stylus" rel="stylesheet/style">
@import '../../common/stylus/mixins.styl';

.msite {
  width: 100%;
  margin-bottom: 45px;

  .msite_nav {
    bottom-border-10px(#000);
    margin-top: 45px;
    height: 200px;
    background: #ffffff;
    overflow: hidden;

    .swiper-container {
      width: 100%;
      height: 100%;
      --swiper-theme-color: #ff6600;
      --swiper-pagination-color: #00ff33; /* 两种都可以 */

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;
            height: 50%;

            .food_container {
              display: black;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
    }

    .swiper-pagination {
      >span.swiper-pagination-bullet-active {
        background: #000;
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0 10px;

      .iconfont {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>