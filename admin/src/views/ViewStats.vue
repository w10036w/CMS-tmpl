<template lang="slm">
.view.view-home
  .test @click="verify" Test
</template>
<script>
import { mapGetters } from 'vuex'
//import Comp from '~c/Comp.vue'

export default {
  name: 'view-home',
  components: {  },
  data: () => ({
    
  }),
  props: [],
  watch: {},
  beforeMount () {},
  mounted () {},
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
