<template lang="slm">
el-card.box.box-login
  h1 Login
  el-row :gutter="10"
    el-col :span="6" Username
    el-col :span="18"
      el-input v-model="username" placeholder="username"
  el-row :gutter="20"
    el-col :span="6" Password
    el-col :span="18"
      el-input type="password" v-model="password" placeholder="password"
  .btn-group.flex.justify-sa
    el-button type="primary" size="large" :loading="loging" @click="login" Login
    el-button type="default" size="large" @click="reset" Reset
</template>
<script>
import { mapGetters } from 'vuex'
import { ls } from '~u/storage'

export default {
  name: 'box-login',
  components: {  },
  data: () => ({
    username: '',
    password: '',
    loging: false,
  }),
  computed: {
    ...mapGetters(['logs'])
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        return this.$notify.error({
          title: 'Invalid input',
          message: 'Empty username or password'
        })
      }
      this.loging = true
      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      }).then(d => {
        this.loging = false
        if (d) {
          ls.set('token', d.token)
          this.$router.push({ name: 'ViewHome' })
        } 
      })
    },
    reset () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.box-login
  width 600px
  height 400px
  padding 10px 20px
  background-color white
  .el-row
    height 80px
    line-height 80px
  .btn-group
    margin-top 20px
</style>
