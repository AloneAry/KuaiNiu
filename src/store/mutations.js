/*
直接更新state的多个方法的对象
*/ 
import Vue from "vue"
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
}from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) { 
    state.info = info 
  },
  [RECEIVE_RATINGS](state, {ratings}) { 
    state.ratings = ratings 
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods 
  },

  [INCREMENT_FOOD_COUNT](state, {food}) { 
    if(!food.count) { // 第一次增加时, 没有 count 
    // food.count = 1 
    // 添加 count 属性, 并指定为 1 
    // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变 
    Vue.set(food, 'count', 1) // 给有数据绑定的对象添加指定属性名和值的属性(有绑定) 
    state.cartFoods.push(food) // 添加到购物车 
  } else { // 有 count 
    food.count++ 
    } 
  },
  [DECREMENT_FOOD_COUNT](state, {food}) { 
    if(food.count) { // count 有值才减 1 
      food.count-- 
      if(food.count===0) {// 如果数量减为 0, 从购物车中移除 
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1) 
      } 
    }
  },
  [CLEAR_CART](state) {
    // 将所有food的count置为0
    state.cartFoods.forEach(food => food.count = 0)
    // 将购物车重置为空数组
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops 
  },
}