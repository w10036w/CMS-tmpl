<template lang="slm">
.article-item 
  .meta
    // | By 
    // b {{ e.author.displayName }}
    // router-link.author :to="'/user/'+e.author.username" {{ e.author.displayName }}
    template v-if="category"
      | Under 
      router-link :to="'/category/'+e.category.path" {{ e.category.name }}
      | , on 
    | {{ e.createAt | fmtDateyymd }}
  h1.title 
    router-link :to="'/article/'+e.path" {{ e.title }}
  .tags v-if="tag"
    router-link.tag v-for="e in article.tags" :key="e._id" :to="'/tag/'+e.path" {{ e.name }}
  article.md-body v-if="detail" v-html="vhtml"
  template v-else=""
    .summary.md-body v-html="e.summary"
    router-link :to="'/article/'+e.path" Read More ...
</template>
<script>
export default {
  props: ['e', 'detail', 'tag', 'category']
}
</script>
<style lang="stylus">
@import '../styl/__var'
.article-item
  padding-bottom 20px
  border-bottom 1px solid rgba(black, .2)
  .meta
    b
      color cPrimary
@media (min-width 769px)
  .article-item
    .meta
      float right
      line-height 40px
@media (max-width 768px)
  .article-item
    .meta
      display none
</style>