<template lang="slm">
.view.view-article
  main.pre-pager v-if="article"
    .meta.right
      | By 
      b {{ article.author.displayName }}
      | , Under 
      router-link :to="'/category/'+article.category.path" {{ article.category.name }}
      //b {{ article.category.name }}
      | , on {{ article.createAt | fmtDateyymd }}
    h1.title {{ article.title }} 
    .tags 
      router-link.tag v-for="e in article.tags" :key="e._id" :to="'/tag/'+e.path" {{ e.name }}
    article.md-body v-html="vhtml"
  FootPager :ctx="article_ctx" direct="1" 
  .comments v-if="article && article.allowComment"
    Disqus :update="disqusUpdate"
</template>
<script>
import { mapGetters } from 'vuex'
import Disqus from '@c/Disqus'
import FootPager from '@c/FootPager'

import bar from '../bar'

function asyncData ({ store, route, bar }) {
  bar && bar.start()
  const path = route.params.path
  return store.dispatch('fetch_article', { path })
    .then(d => {
      bar && bar.finish()
      // in the future under same category
      return d && d._id && store.dispatch('fetch_article_ctx', { id: d._id })
    })
}

export default {
  name: 'view-article',
  components: { Disqus, FootPager },
  asyncData,
  data: () => ({
    disqusUpdate: 0
  }),
  meta () {
    const title = (this.article && this.article.title) + ' | Arknodejs' 
    const description = 'article from Arknodejs.com'
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
    ...mapGetters(['article_ctx', 'article']),
    vhtml () {
      return this.article.html//.replace(/\n/g, '<br>')//.replace(/\s/g, '\b')
    }
  },
  created () {
    console.log('in view article')
  },
  watch: {
    '$route.params.path' () {
      // trigger disqus update
      this.disqusUpdate++
    }
  },
  beforeMount () {
    if (!this.article) this.$router.push('/error')
  },
  mounted () {
    this.disqusUpdate++
  },
}
</script>
<style lang="stylus">
@import '../styl/__var'
.view-article
  main
    padding-top .1px
    .meta
      line-height 40px
      b
        color cPrimary
    article
      margin-top 10px
</style>
