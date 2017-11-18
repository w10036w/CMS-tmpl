<template lang="slm">
#app
  NavMenu
  AsideMenu
  transition name="fade" mode="out-in"
    router-view.trans-4
</template>
<script>
import AsideMenu from '@c/AsideMenu'
import NavMenu from '@c/NavMenu'
// import MobileDetect from 'mobile-detect'

export default {
  components: { NavMenu, AsideMenu },
  beforeMount () {
    // const md = new MobileDetect(window.navigator.userAgent)
    // this.$store.dispatch('set_mobile_detect', md)
  }
}  
</script>
<style lang="stylus">
@import 'styl/*'
</style>
