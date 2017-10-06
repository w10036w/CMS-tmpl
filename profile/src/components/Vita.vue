<template lang="slm">
.tmpl-vita
  header
    .logo
      i.i.i-logo
    .text
      .name {{ e.name }}
      .title {{ e.title }}
    .avatar :style="'background:url('+e.avatar+') center/cover no-repeat'"
  .exp
    h2
      i.fa.fa-black-tie.fa-lg
      | experience
    .exp-item v-for="(el, i) in e.experience" :key="el.firm"
      .row
        .col.col-3
          .institute :class="{'active':i===0}"
            a :href="el.link" {{ el.firm }}
            i.fa.fa-bullseye
          .duration {{ el.start }} - {{ el.end }}
        .col.col-9
          .position {{ el.position }}
          ul.items
            li.item v-for="i in el.items" :key="i" {{ i }}
          .logo 
            img :src="el.icon"
  .edu
    h2 
      i.fa.fa-suitcase.fa-lg
      | education
    .exp-item v-for="(el, i) in e.education" :key="el.title"
      .row
        .col.col-3
          .institute :class="{'active':i===0}"
            a :href="el.link" {{ el.school }}
            i.fa.fa-bullseye
          .duration {{ el.start }} - {{ el.end }}
        .col.col-9
          .position {{ el.title }}
          .major Major in {{ el.major }}
          .logo 
            img :src="el.icon"
  .sns
    h2
      i.fa.fa-send-o.fa-lg
      | One More Thing
    .exp-item.t-center
      a :href="e.sns.github" target="_blank"
        i.fa.fa-github.fa-2x
      a :href="e.sns.linkedin" target="_blank"
        i.fa.fa-linkedin.fa-2x
      a :href="e.sns.envelope" target="_blank"
        i.fa.fa-envelope.fa-2x
      a :href="e.sns.rss" target="_blank"
        i.fa.fa-rss.fa-2x
  .copyright
    .t-center 
      | This template is origined by 
      a href="https://www.behance.net/gallery/9714739/Resume-Vita" target="_blank" Sven Kaiser
      | .

</template>
<script>
export default {
  name: 'tmpl-vita',
  props: ['e']
}

</script>
<style lang="stylus">
c-blue = #1ca9ca
c-grey = #203630
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
        font-weight bold
        font-size 3em
      .title
        font-weight 100
        text-transform uppercase
        font-size 1.8em
    .avatar
      position absolute
      top 25px
      right 0
      height 150px
      width 150px
      overflow hidden
      border-radius 35px
  h2
    text-transform uppercase
    color c-blue
    .fa
      margin-right 15px
      vertical-align middle
  .exp, .edu, .sns
    .logo
      width 200px
      height 50px
      img
        width 100%
    .exp-item
      .col-3
        box-sizing border-box
        padding-left 3.6em
        .institute
          position relative
          font-size 1.4em
          font-weight bold
          i
            color #d2d2d2
            position absolute
            top 5px 
            right -10px
            z-index 100
          &.active i
            color #1ca9ca
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
        padding-bottom 1em
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
          height 100px
          overflow hidden
          opacity .5
          img
            width 100%
    .duration
      text-transform capitalize
  .sns
    margin-bottom 20px
    .exp-item
      .fa
        margin-left 20px
        margin-right 20px
        color c-blue
</style>