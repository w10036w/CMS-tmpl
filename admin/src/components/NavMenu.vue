<template lang="slm">
nav.nav-bar
  el-menu theme="dark" :router="true" :default-active="activeTab" mode="horizontal"
    el-menu-item index="/" Dashboard
    el-menu-item index="/stats" Statistics
    el-submenu index="3"
      template slot="title" Create
      el-menu-item index="/create/user" User 
      el-menu-item index="/create/article" Article 
      el-menu-item index="/create/category" Category 
      el-menu-item index="/create/tag" Tag 
    template v-if="authed"
      el-submenu.right index="9" 
        template slot="title" {{ authed.username }} 
        el-menu-item index="9-1" 
          router-link :to="'/user/'+authed.username" Profile
        el-menu-item index="9-1" v-if="bAdmin"
          router-link :to="'/user/'+authed.username+'/settings'" Settings
        el-menu-item index="9-3" 
          span @click="logout" Logout
      //el-submenu index="10" {{ authed.username }} 
    template v-else=""
      el-menu-item.right index="/login" Login

</template>
<script>
import { mapGetters } from 'vuex'
import { ls } from '~u/storage'

export default {
  name: 'NavBar',
  components: {  },
  data: () => ({
    
  }),
  computed: {
    ...mapGetters({
      authed: 'auth/authed'
    }),
    bAdmin () { return this.authed.role === 'admin' },
    activeTab () { return this.$route.name },
  },
  methods: {
    logout () {
      ls.set('token', '')
      location.reload()
    }
  },
  //props: [],
  beforeMount () {},
  mounted () {},
}
</script>
<style lang="stylus" >
@import '../styl/__var'
.nav-bar
  position fixed
  top 0
  left 0
  width 100%
  height 60px
  background-color c-i-blue
  z-index zNav
  >.el-menu
    >.el-menu-item
      a
        line-height 60px
  .el-menu--horizontal
    .right.el-submenu
      text-align center
      >.el-menu
        width 120px
        left unset
        right 0
        .el-menu-item
          width 100%
          min-width unset
</style>
