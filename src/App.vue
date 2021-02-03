<template> 
  <div id="app"> 
    <router-view/> 
    <FooterGuide v-show="$route.meta.showFooter"/> 
  </div> 
</template> 

<script> 

import FooterGuide from './components/FooterGuide/FooterGuide.vue' 
import {mapActions} from 'Vuex'
// import {reqCategorys} from './api'

export default { 

  // async mounted () {
  //   const result = await reqCategorys()
  //   console.log(result)
  // },

  mounted () {
    // this.$store.dispatch('getAddress')
    this.getAddress()
  },

  methods: {
    ...mapActions(['getAddress'])
  },
  
  components: { 
    FooterGuide 
  },
  
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
