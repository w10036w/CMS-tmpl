<template lang="slm">
.view.view-articles
  .block.t-center v-if="type==='tag'"
    | Articles tagged with 
    strong.primary {{ $route.params.path }}
  .block.t-center v-else-if="type==='category'"
    | Articles under category 
    strong.success {{ $route.params.path }}
  // list of articles
  .article-list.pre-pager
    ArticleItem :e="e" v-for="e in articles" :key="e._id" :category="type==='home'"
  FootPager ctx="ctx" v-if="ctx[0] || ctx[1]"
</template>
<script>
import { mapGetters } from 'vuex'
import FootPager from '@c/FootPager'
import ArticleItem from '@c/ArticleItem'
import bar from '../bar' 

function asyncData ({ store, route }) {
  bar.start()
  const page = Math.floor(route.query.page) || 1
  store.dispatch('set_page', page)
  const limit = Math.floor(route.query.limit) || 20
  const skip = (page-1)*limit || 0
  let pref = '/articles'
  if (route.name.includes('Tag')) {
    pref += '/tag/' + route.params.path
  } else if (route.name.includes('Category')) {
    pref += '/category/' + route.params.path
  }

  return store.dispatch('fetch_articles', { pref, sort: '-createAt', skip, limit })
    .then(d => bar.finish())
}

export default {
  name: 'view-articles',
  components: { ArticleItem, FootPager },
  asyncData,
  meta () {
    const title = this.name + ' | Arknodejs'
    const description = 'Sorted articles'
    return { 
      title, 
      'og:title': title,
      description,
      'og:description': description,
      'og:type': 'article',
      'og:url': `https://arknodejs.com${this.$route.path}`
    }
  },
  computed: {
    ...mapGetters(['articles']),
    name () { return this.$route.name.substr(4) },
    type () {
      if (this.name==='home') return 'home'
      if (this.name.includes('Category')) return 'category'
      if (this.name.includes('Tag')) return 'tag'
    },
    ctx () {
      let prev, next
      const page = Math.floor(this.$route.query.page) || 1
      if (page!==1)
        prev = { title: `Page ${page-1}`, path: `/?page=${page-1}` }
      if (this.articles.length===20) 
        next = { title: `Page ${page+1}`, path: `/?page=${page+1}` }
      return [prev, next]
    }
  },
  watch: {
    '$route' () {
      return asyncData({ store: this.$store, route: this.$route })
    },

  },
  mounted () {},
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.view-articles
  .block
  .article-list
    padding-top .1px
  .block
    background-color #f7f7f7
    line-height hNav
    height hNav
    font-size 1.3em
    .primary
      color cPrimary
    .success
      color cSuccess
</style>
