<template lang="slm">
.aside-menu
  el-menu :router="true" :default-active="activeTab"
    el-menu-item index="/" Dashboard
    el-menu-item index="/stats" Statistics
    el-menu-item index="/users"  Users
    el-menu-item index="/articles" Articles
    el-menu-item index="/categories" Categories
    el-menu-item index="/tags" Tags
    el-menu-item index="/settings" Settings
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'aside-menu',
  components: {  },
  data: () => ({
    
  }),
  computed: {
    activeTab () { return this.$route.path },
    ...mapGetters({
      
    })
  },
  props: [],
  watch: {},
  beforeMount () {},
  mounted () {},
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.aside-menu
  position fixed
  top 60px
  left 0
  width wAsideMenu
  min-height calc(100vh - 60px)
  background-color #eef1f6
  text-align center
</style>
