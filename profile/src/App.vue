<template lang="slm">
#app
  main
    TmplVita.tmpl v-if="tmpl==='vita'" :e="e" :lang="lang"
</template>

<script>
import TmplVita from './components/Vita'
import data from './profile.json'
import { URL } from './utils/url'

export default {
  name: 'app',
  components: { TmplVita },
  data: () => ({
    e: data.en,
    lang: 'en',
    tmpl: 'vita'
  }),
  created () {
    const url = URL()
    const lang = url.search.lang
    if (lang) {
      this.e = data[lang]
      this.lang = lang
    }
    if (url.search.tmpl) 
      this.tmpl = url.search.tmpl
  }
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
main
  padding-bottom 20px
.t-center
  text-align center
  
@media screen and (max-width 640px)
  .tmpl
    padding-left 20px
    padding-right 20px
</style>
