<template lang="slm">
nav.t-center.trans-3 :class="{'scroll-hide':scrollNavHide}"
  strong.i-menu @click="toggleAside" »
  router-link to="/" Arknode - Blog
  .aside-mask :class="{'active':asideToggled}" @click="toggleAside"
</template>
<script>
import mxScrollNavHide from '@m/scrollNavHide'

export default {
  mixins: [mxScrollNavHide],
  data: () => ({
    domAside: null,
    asideToggled: false,
    scrollNavHide: false,
  }),
  watch: {
    '$route' () {
      window.innerWidth<769 && this.asideToggled && this.toggleAside()
    }
  },
  methods: {
    toggleAside () {
      // not recommended to do so
      if (!this.domAside) this.domAside = document.querySelector('aside')
      if (this.asideToggled) {
        this.asideToggled = false
        this.domAside.style.left = '-300px'
      } else {
        this.asideToggled = true
        this.domAside.style.left = 0
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
nav
  display none
  font-family Dosis
  position fixed
  top 0
  left 0
  width 100%
  height hNav
  z-index zNav
  line-height hNav
  color white
  font-size 1.5em
  //background linear-gradient(to bottom, cIpurple 0%, rgba(cIpurple, .9) 80%, transparent 100%)
  background-color cIpurple
  .i-menu
    position absolute
    left 0
    top 0
    height hNav
    width hNav
  a
    color white
    &:hover
      text-decoration none
  .aside-mask
    position fixed
    display none
    opacity 0
    top 0
    width 100%
    left 0
    bottom 0
    background-color rgba(black, .6)
    z-index (zAside - 1)
    transition opacity .3s ease
    &.active
      display block
      opacity 1
  &.scroll-hide
    top (- hNav)
@media (max-width 768px)
  nav
    display block
</style>
