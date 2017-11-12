<template lang="slm">
#app
  NavMenu v-if="authed"
  AsideMenu v-if="authed"
  transition name="fade" mode="out-in"
    router-view.trans-3
</template>
<script>
import { mapGetters } from 'vuex'
const AsideMenu = () => import('~c/AsideMenu')
const NavMenu = () => import('~c/NavMenu')
import api from './store/api'
import { ls } from '~u/storage'

export default {
  components: { NavMenu, AsideMenu },
  data: () => ({
    lsToken: ''
  }),
  computed: {
    ...mapGetters({
      authed: 'auth/authed',
      logs: 'logs',
      loading: 'loading'
    }),
  },
  watch: {
    'logs.length' () {
      console.log(this.logs)
      const { type, code, note } = this.logs[this.logs.length-1]
      if (code>203)
        this.$notify.error({
          title: type,
          message: note
        })
    }
  },
  methods: {
    initCheck (type) {
      if (this.$route.name === 'ViewLogin') {
        if (this.authed) {
          return this.$router.push({ name: 'ViewHome' })
        }
      } else {
        !type && this.verify()
      }
    },
    verify () {
      if (this.authed) return
      if (!this.lsToken) return this.$router.push({ name: 'ViewLogin' })
      this.$store.dispatch('auth/verify', this.lsToken)
        .then(j => {
          if (!j) {
            this.notify('Token invalid or expired')
            this.$router.push({ name: 'ViewLogin' })
          } else {
            this.initCheck(1)
          }
        }).catch(e => {
          this.notify('Token invalid or expired')
          this.$router.push({ name: 'ViewLogin' })
        })
    },
    notify(message, title, type='error', color='red') {
      this.$notify[type]({
        title: title || 'Permission Denied',
        message: message || 'You must login first'
      })
    }
  },
  beforeMount () {
    this.lsToken = ls.get('token')
    this.lsToken && api.addAuth(this.lsToken)
    this.initCheck()
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
@import 'styl/*'
</style>
