<template lang="slm">
.view.view-home
  .test @click="verify" Home for Dashboard
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'view-home',
  methods: {
    verify () {
      this.$store.dispatch('user/verify')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.view-home
  background-color rgba(white, .8)
  .test
    color c-i-red
</style>
