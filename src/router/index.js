// 路由模块
import Vue from 'vue' 
import VueRouter from 'vue-router' 
import Msite from '../pages/Msite/Msite.vue' 
import Search from '../pages/Search/Search.vue' 
import Order from '../pages/Order/Order.vue' 
import Profile from '../pages/Profile/Profile.vue' 
// 一级路由
import Login from '../pages/Login/Login.vue' 

Vue.use(VueRouter) 

export default new VueRouter({ 
  routes: [ 
    { 
      path: '/', 
      redirect: '/msite' 
    },
    { 
      path: '/msite', 
      component: Msite, 
      meta: {
        showFooter: true
      }
    },
    { 
      path: '/search', 
      component: Search, 
      meta: {
        showFooter: true
      }
    },
    { 
      path: '/order', 
      component: Order,
      meta: {
        showFooter: true
      } 
    },
    { 
      path: '/profile', 
      component: Profile, 
      meta: {
        showFooter: true
      }
    },
    { 
      //  一级路由
      path: '/login', 
      component: Login, 
    } 
  ] 
})