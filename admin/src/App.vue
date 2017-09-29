<template lang="slm">
#app
  NavMenu v-if="authed"
  AsideMenu v-if="authed"
  transition name="slideRight" mode="out-in"
    router-view.trans-5
</template>
<script>
import { mapGetters } from 'vuex'
const AsideMenu = () => import('~c/AsideMenu')
const NavMenu = () => import('~c/NavMenu')
import { ls } from '~u/storage'

export default {
  components: { NavMenu, AsideMenu },
  data: () => ({
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
        // if no store/auth/authed
      if (!this.authed) {
        if (ls.get('token')) {
          this.$store.dispatch('auth/verify', ls.get('token'))
            .then(j => {
              if (!j) {
                this.notify('Token invalid or expired')
                this.$router.push({ name: 'ViewLogin' })
              } else {
                this.initCheck(1)
              }
            })
        } else {
          this.notify()
          this.$router.push({ name: 'ViewLogin' })
        }
      }
    },
    notify(message, title, type='error', color='red') {
      this.$notify[type]({
        title: title || 'Permission Denied',
        message: message || 'You must login first'
      })
    }
  },
  beforeMount () {
    this.initCheck()
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
@import 'styl/*'
</style>
