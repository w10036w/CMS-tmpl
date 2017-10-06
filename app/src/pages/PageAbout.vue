<template lang="slm">
.page.page-about
  .md-body v-html=""
</template>
<script>
import { mapGetters } from 'vuex'
//import Comp from '@c/Comp'
import bar from '../bar'

function _fetch({ store, bar }) {
  bar && bar.start()

  //return store.dispatch('')
}

export default {
  name: 'page-home',
  //components: {  },
  asyncData: ({ store, bar }) => _fetch({ store, bar }),
  data: () => ({
    
  }),
  computed: {
    ...mapGetters(['article'])
  },
  meta () {
    return { title: 'VUE SSR TMPL' }
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
</style>
