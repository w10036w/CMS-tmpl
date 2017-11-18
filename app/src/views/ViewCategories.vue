<template lang="slm">
.view.view-categories
  main.pre-pager v-if="categories && categories.length"
    span.category.link.trans-3 :class="{'active':i===selected}" v-for="(e, i) in categories" @click="select(i)" {{ e.category.name }} ({{ e.articles.length }})
    template v-if="categories[selected].articles.length"
      h2.text 
        strong.success {{ categories[selected].articles.length }} 
        | Articles under Category 
        strong.success {{ categories[selected].category.name }}
      ul.classified-articles
        li v-for="el in categories[selected].articles"
          ArticleItem :e="el"
  .tags-empty.pre-pager v-else=""
    |
      Sorry no categories
</template>
<script>
import { mapGetters } from 'vuex'
import ArticleItem from '@c/ArticleItem'
import bar from '../bar'

function asyncData({ store }) {
  bar.start()
  return store.dispatch('fetch_categories')
    .then(() => bar.finish())
}

export default {
  name: 'view-categories',
  components: { ArticleItem },
  data: () => ({
    selected: 0
  }),
  computed: {
    ...mapGetters(['categories']),
  },
  asyncData,
  meta () {
    return { title: 'Categories | Arknodejs' }
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
.view-categories
  main
    padding-top 20px
    .category
      &.active
        color white
        font-weight bold
        background-color cSuccess
    .text
      font-weight normal
      padding 10px
      background-color #f7f7f7
      .success
        color cSuccess
    ul
      list-style none
      padding-left 1em

</style>