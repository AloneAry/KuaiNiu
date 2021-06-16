// 入口JS文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from "mint-ui"


import './filters'
import './mock/mockServer'
import Split from "./components/Split/Split.vue"

Vue.component('Split', Split)

Vue.config.productionTip = false

Vue.component(Button.name,Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store// 使用上vuex
  // components: { App },
  // template: '<App/>'
})
