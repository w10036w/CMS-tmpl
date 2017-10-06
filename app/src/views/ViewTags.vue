<template lang="slm">
.view.view-tagcloud
  main.pre-pager v-if="tagcloud && tagcloud.length"
    .tag.link.trans-3 :class="{'active':i===selected}" v-for="(e, i) in tagcloud" @click="select(i)" {{ e.tag.name }} ({{ e.articles.length }})
    template v-if="tagcloud[selected].articles.length"
      h2.text 
        strong.primary {{ tagcloud[selected].articles.length }} 
        | Articles tagged with 
        strong.primary {{ tagcloud[selected].tag.name }}
      ul.taged-articles 
        li v-for="el in tagcloud[selected].articles"
          ArticleItem :e="el"
  .tags-empty.pre-pager v-else=""
    |
      Sorry no tags
</template>
<script>
import { mapGetters } from 'vuex'
import ArticleItem from '@c/ArticleItem'
import bar from '../bar'

function asyncData({ store }) {
  bar.start()
  return store.dispatch('fetch_tagcloud')
    .then(() => bar.finish())
}

export default {
  name: 'view-tagcloud',
  components: { ArticleItem },
  data: () => ({
    selected: 0
  }),
  computed: {
    ...mapGetters(['tagcloud']),
  },
  asyncData,
  meta () {
    return { title: 'Tags | Arknodejs' }
  },
  methods: {
    select (i) {
      this.selected = i
    }
  }
}
</script>
<style lang="stylus">
@import '../styl/__var'
.view-tagcloud
  main
    padding-top 20px
    .tag
      font-size 1em
      &.active
        color white
        font-weight bold
        background-color cPrimary
    .text
      font-weight normal
      padding 10px
      background-color #f7f7f7
      .primary
        color cPrimary
    ul
      list-style none
      padding-left 1em

</style>