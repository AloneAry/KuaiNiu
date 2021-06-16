/*
通过mutation间接更新state的方法的对象
*/ 
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

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop
}from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },

  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发送异步ajax请求
    const result = await reqCategorys()
    // 提交一个mutation
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  //同步获取用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  // 异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER_INFO)
    }
  },

  async getShopInfo({commit}) {
    const result = await reqShopInfo() 
    if(result.code===0) { 
      const info = result.data 
      info.score = 3.5 
      commit(RECEIVE_INFO, {info})
    } 
  },
  // 异步获取商家评价列表 
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings() 
    if(result.code===0) { 
      const ratings = result.data 
      commit(RECEIVE_RATINGS, {ratings})

      callback && callback()
    } 
  },
  // 异步获取商家商品列表 
  async getShopGoods({commit},callback) { 
    const result = await reqShopGoods() 
    if(result.code===0) { 
      const goods = result.data 
      commit(RECEIVE_GOODS, {goods}) 
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      callback && callback()
    } 
  },
  // 更新指定 food 的 count 
  updateFoodCount ({commit}, {food, isAdd}) { 
    if(isAdd) { 
      // 增加 
      commit(INCREMENT_FOOD_COUNT, {food}) 
    } else { 
      // 减少 
      commit(DECREMENT_FOOD_COUNT, {food}) 
    } 
  },

  // 清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

  // 异步获取商家列表
  async getSearchShops ({commit,state},keyword) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    // 提交一个mutation
    if(result.code===0){
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}