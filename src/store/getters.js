/*
基于state的getter计算属性的对象
*/ 
export default {
  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count
    },0)
  },
  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count*food.price
    },0)
  },
   // 好评数量
   positiveCount (state) {
    return state.ratings.reduce((preTotal, rating) => {
      return preTotal + (rating.rateType===0 ? 1 : 0)
    }, 0)
  }
}