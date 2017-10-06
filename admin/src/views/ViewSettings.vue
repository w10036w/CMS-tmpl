<template lang="slm">
.view.view-settings
  el-row
    el-col :span="16"
      el-form label-width="150px"
        el-collapse v-model="activePanels"
          el-collapse-item title="Change Password" name="1"
            el-form-item label="New Password"
              el-input v-model="password"
            el-form-item label="Target UserId" v-if="authed && authed.role==='admin'"
              el-input v-model="others" placeholder="Leave blank if change your own"
            el-form-item
              el-button type="success" @click="changePass" CONFIRM
          el-collapse-item title="Change GA track" name="2"
            div Google Analytics
          el-collapse-item title="Change Theme" name="3"
            el-form-item label="Theme"
              el-select placeholder="Choose" v-model="theme"
                el-option label="theme1" value="theme1"
                el-option label="theme2" value="theme2"
</template>
<script>
import { mapGetters } from 'vuex'
//import Comp from '~c/Comp.vue'

export default {
  name: 'view-home',
  components: {  },
  data: () => ({
    password: '',
    others: '',
    theme: '',
    activePanels: ['1']
  }),
  computed: {
    ...mapGetters({
      authed: 'auth/authed'
    })
  },
  props: [],
  watch: {},
  beforeMount () {},
  mounted () {},
  methods: {
    changePass () {
      this.$store.dispatch('change_pass', 
        { password: this.password, id: this.others || this.authed._id })
        .then(d => {
          this.$notify({ title: 'Success', type: 'success', message: `Password is changed.`})
        }).catch(e => {
          this.$message({ type: 'info', message: 'Action Cancelled' })
        })
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
