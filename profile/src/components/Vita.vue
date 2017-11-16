<template lang="slm">
.tmpl-vita
  header
    .logo
      i.i.i-logo
    .text
      .name {{ e.name }}
      .title {{ e.title }}
    .avatar :style="'background:url('+e.avatar+') center/cover no-repeat'"
  .summary
    h2
      i.fa.fa-user.fa-lg
      | {{ summary }}
    summary v-html="e.summary"
  .tech
    h2
      i.fa.fa-sitemap.fa-lg
      | {{ tech }}
    summary v-html="e.tech"
  .exp
    h2
      i.fa.fa-black-tie.fa-lg
      | {{ experience }}
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
      i.fa.fa-university.fa-lg
      | {{ education }}
    .exp-item v-for="(el, i) in e.education" :key="el.title"
      .row
        .col.col-3
          .institute :class="{'active':i===0}"
            a :href="el.link" {{ el.school }}
            i.fa.fa-bullseye
          .duration {{ el.start }} - {{ el.end }}
        .col.col-9
          .position {{ el.title }}
          .major {{ el.major }}
          .logo 
            img :src="el.icon"
  .links
    h2
      i.fa.fa-send-o.fa-lg
      | links
    template v-if="e.links"
      .exp-item v-for="(v, k) in e.links" :key="k"
        a :href="v" target="_blank" {{ k }}
  .sns
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
      a href="https://www.behance.net/gallery/9714739/Resume-Vita" target="_blank" Vita template 
      | by Sven Kaiser.

</template>
<script>
export default {
  name: 'tmpl-vita',
  props: ['e', 'lang'],
  data: () => ({
    summary: 'summary',
    tech: 'tech stack',
    experience: 'experience',
    education: 'education',
  }),
  created () {
    if (this.lang==='ch') {
      this.summary = '职业方向'
      this.tech = '技术储备'
      this.experience = '工作履历'
      this.education = '最高学历'
    }
  }
}

</script>
<style lang="stylus">
c-blue = #1ca9ca
c-grey = #203630
c-border = #e8e8ea
.tmpl-vita
  font-family 'Open Sans', sans-serif
  background url(/static/background-gray.png) left/contain no-repeat
  max-width 1060px
  width 100%
  margin 0 auto
  a
    color unset
    text-decoration none
    border-bottom .5px solid c-blue
    transition all .4s ease
    &:hover
      color c-blue
      background-color c-border
  header
    position sticky 
    top 0
    left -10px
    width 100%
    z-index 1000
    background-color white
    padding-bottom  15px
    border-bottom 1px solid c-border
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
    position relative
    padding-left 2em
    .fa
      position absolute
      top .2em
      left 0
      width 1.5em
      height 1.5em
      vertical-align middle
  summary 
    padding-left  3em
    padding-right  3em
  .tech, .exp, .edu, .sns
    padding-top 15px
    .logo
      width 200px
      height 50px
      img
        width 100%
    .exp-item
      .col-3
        box-sizing border-box
        padding-left 3em
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
    padding 20px 0
    .exp-item
      .fa
        margin-left 20px
        margin-right 20px
        padding 10px 5px
        color c-blue
      a
        border none
        display inline-block
</style>