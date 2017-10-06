<template lang="slm">
.foot-pager.pagination.t-center
  router-link.prev.left v-if="ctx[0] && ctx[0].path" :to="'/article/'+ctx[0].path" &laquo {{ ctx[0].title }}
  router-link.direct v-if="direct" to="/" Home
  router-link.next.right v-if="ctx[1] && ctx[1].path" :to="'/article/'+ctx[1].path" {{ ctx[1].title }} &raquo

</template>
<script>
export default {
  name: 'foot-pager',
  props: ['ctx', 'direct'],
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.foot-pager
  position relative
  border-top 1px dashed rgba(black, .2)
  padding-left 20px
  padding-right 20px
  height hPager
  line-height hPager
  .direct
    position absolute
    width 100px
    text-align center
    height hPager
    left 50%
    margin-left -50px
  span
    margin 7.5px 0
    padding 4px
    max-width 45%
    font-size .9em
</style>
