<template lang="slm">
.view.view-login.flex.justify-c.align-c
  BgMousemove
  BoxLogin
</template>
<script>
import BoxLogin from '~c/BoxLogin'
import BgMousemove from '~c/BgMousemove'
import { mapGetters } from 'vuex'

export default {
  name: 'view-home',
  components: { BoxLogin, BgMousemove },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      authed: 'auth/authed'
    }),
  },
  mounted () {
    if (this.authed) {
      this.$router.push({ name: 'ViewHome' })
    }
  },
}
</script>
<style lang="stylus">
//@import '../styl/__var'
</style>
