<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            @click="clickMenuItem(index)"
            :class="{current: currentIndex===index}"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsWrapperUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index" @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.descripttion }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from "Vuex"
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'



export default {
  data() {
    return {
      scrollY: 0,//右侧Y轴滑动的坐标
      tops: [],//包含右侧所有分类小列表的top值
      food:{} //需要显示 的food
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods",() => {
      this.$nextTick(() => {
        // new BScroll('.menu-wrapper')
        // new BScroll('.foods-wrapper')
        // 初始化滚动
        this._initScroll()
        // 初始化tops
        this._initTops()
      })
    });
  },
  methods: {
    _initScroll () {
      new BScroll(this.$refs.menuWrapper,{
        click: true //响应点击
      })
      // 右侧food列表的BScroll
      this.foodsScroll = new BScroll('.foods-wrapper',{
        probeType: 2,// 手指滑动（惯性滑动和编码滑动不监视）
        click: true// 响应点击
      })

      // 监视滑动过程
      this.foodsScroll.on('scroll',(pos) => {
        console.log(pos.y)
        // 保存y
        this.scrollY = Math.abs(pos.y)
      })
      // 监视【滑动结束
      this.foodsScroll.on('scrollEnd',(pos) => {
        console.log('滑动结束',pos.y)
        this.scrollY = Math.abs(pos.y)// 解决惯性滑动更新
      })
    },

    _initTops () {
      const tops = []
      let top = 0
      // 计算各个top，并保存在tops
      tops.push(top)

      // 得到ul 下所有的子li
      const  lis = this.$refs.foodsWrapperUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach((li,index) => {
        top += li.clientHeight
        tops.push(top)
      })
      // 保存tops
      this.tops = tops
      console.log(this.tops)
    },

    clickMenuItem (index) {
      // 得到滚动目标坐标
      const top = this.tops[index]
      // 更新目标scrollY值
      this.scrollY = top
      // 平滑滚动到指定位置
      this.foodsScroll.scrollTo(0,-top,300)
    },

    // 显示点击的food
    showFood (food) {
      //更新food
      this.food = food
      //显示food组件(父组件调用子组件对应的方法)
      this.$refs.food.toggleShow()
    }
  },

  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标 
    currentIndex () {// 初始和相关数据发生了变化
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index =tops.findIndex((top,index) => {
        return this.scrollY>=top && this,scrollY<this.tops[index+1]
      })
      return index
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
// @import "../../../common/stylus/mixins/mixins.styl"
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: 10px
        background: #fff
        color: #02a774
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px 
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18PX
      padding-bottom: 18px
      bottom-border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7,17,27)
        .desc,.extra
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240,20,20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147,153,159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
