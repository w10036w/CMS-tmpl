<template lang="slm">
#app
  main
    curr-layout.tmpl :e="e"
  nav-footer
</template>

<script>
import CurrLayout from './components/Vita'
import NavFooter from './components/NavFooter'
import e from './profile.json'
import cn from './profile.json'

export default {
  name: 'app',
  components: { CurrLayout, NavFooter },
  data: () => ({
    e: e
  }),
}
</script>

<style lang="stylus">
html, body
  margin 0
  padding 0
.ellipsis
  text-overflow ellipsis
  white-space nowrap
  overflow hidden
cols = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
.row
  width 100%
  &:after
    content ''
    visibility hidden
    display block
    height 0
    clear both
  .col
    float left
.clearfix
  clear both

for c in cols
  .col-{c}
    width (1/12*c)*100%

.i 
  display inline-block
.tmpl
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

</style>
