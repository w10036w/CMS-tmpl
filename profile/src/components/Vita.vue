<template lang="slm">
.tmpl-vita
  header
    .logo
      i.i.i-logo
    .text
      .name {{ e.name }}
      .title {{ e.title }}
    .avatar
      img :src="e.avatar"
  .exp
    h2
      i.fa.fa-black-tie.fa-2x
      |
        experience
    .exp-item v-for="el in e.experience" :key="el.firm"
      .row
        .col.col-3
          .firm
            a :href="el.link" {{ el.firm }}
          .duration {{ el.start }} - {{ el.end }}
        .col.col-9
          .position {{ el.position }}
          ul.items
            li.item v-for="i in el.items" :key="i" {{ i }}
          .logo 
            img :src="el.icon"
  .edu
    h2 
      i.fa.fa-bullseye.fa-2x
      |
        education
    .edu-item v-for="el in e.education" :key="el.title"
      .title {{ el.title }}
      .year {{ el.year }}
      .major Major in {{ el.major }}
      .school 
        a :href="el.link" {{ el.school }}
      .logo {{ el.icon }}
  .extra
    .language {{ e.extra.language }}
    .attitude {{ e.extra.attitude }}
    .motto {{ e.extra.motto }}
</template>
<script>
export default {
  name: 'tmpl-vita',
  props: ['e']
}

</script>
<style lang="stylus">
c-blue = #1ca9ca
c-grey = #707780
c-border = #e8e8ea
.tmpl-vita
  font-family 'Open Sans', sans-serif
  background url(/static/background-gray.png) left/contain no-repeat
  width 1060px
  margin 0 auto
  a
    color unset
    text-decoration none
    border-bottom .5px solid c-blue
  header
    position relative
    .logo
      position absolute
      top 60px
      width 80px
      height 80px
      left 0
      .i-logo
        background url('/static/logo.png') center/contain no-repeat
        width 80px
        height 80px
    .text
      padding 40px 210px 40px 90px
      .name 
        font-style italic 
        font-weight bold
        font-size 3em
      .title
        font-weight 100
        text-transform uppercase
        font-size 1.8em
    .avatar
      position absolute
      top 0
      right 0
      height 200px
      width 200px
      overflow hidden
      border-radius 20px
      img
        width 100%
  h2
    text-transform uppercase
    color c-blue
    .fa
      margin-right 15px
      vertical-align middle
  .exp
    .logo
      width 200px
      height 50px
      img
        width 100%
    .exp-item
      .col-3
        box-sizing border-box
        padding-left 3.6em
        .firm
          font-size 1.4em
        .duration
          line-height 1.5em
          font-size 1.2em
          font-style italic
          font-weight 100
          color c-grey
      .col-9
        position relative
        box-sizing border-box
        border-left 2px solid c-border
        padding-left 3.6em
        .position
          font-size 1.2em
        .items
          color c-grey
          line-height 1.4em
        .logo
          position absolute
          z-index -1
          top 0
          right 0
          width 100px
          height 80px
          overflow hidden
          opacity .5
          img
            width 100%
    .duration
      text-transform capitalize
</style>