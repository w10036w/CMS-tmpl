<template lang="slm">
aside.flex.middle_center.trans-3 @mouseover="moveBg" @mouseleave="moveBgBack" ref="aside"
  .mask.abs-full
  .text
    .name.t-center
      a href="https://profile.arknodejs.com" target="_blank"
        .selfie.img-stroke.trans-3
      a.profile href="https://profile.arknodejs.com" target="_blank" Ark SUN
    ul.navs.t-center
      li
        router-link.home to="/" Home
      li
        router-link.categories to="/categories" Categories
      li
        router-link.tags to="/tags" Tags
      li
        router-link.about to="/article/about" About
    ul.sns.flex.space_around
      a.github href="//github.com/w10036w" target="_blank"
        i.fa.fa-github.fa-lg
      a.linkedin href="https://www.linkedin.com/in/sun-fangzhou-b0b03a59" target="_blank"
        i.fa.fa-linkedin.fa-lg
      a.email href="mailto:w10036w@gmail.com"
        i.fa.fa-envelope.fa-lg
      // a.rss href="/rss.html" target="_blank"
      //   i.fa.fa-rss.fa-lg
      a.search :href="searchUrl" target="_blank"
        i.fa.fa-search.fa-lg
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  data: () => ({
    searchUrl: 'https://www.google.com/webhp#newwindow=1&safe=strict&q=site:https://arknodejs.com'
  }),
  methods: {
    moveBg () {
      setTimeout(() => {
        this.$refs.aside.style.backgroundPosition = 'right center'
      }, 0)
    },
    moveBgBack () {
      setTimeout(() => {
        this.$refs.aside.style.backgroundPosition = 'left center'
      }, 0)
    }
  }
}
</script>
<style lang="stylus">
@import '../styl/__var'
aside
  position fixed
  background-color #202020
  background url(/public/img/wall1.jpg) left center/cover no-repeat
  z-index zAside
  height 100%
  left 0
  width 300px
  font-family Dosis
  .selfie
    background url("https://avatars2.githubusercontent.com/u/3350260?s=460&v=4") center/cover no-repeat
    margin 0 auto 10px
    width 100px
    height 100px
    border-radius 20px
    //clip-path polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)
    //animation polygon-ani 10s ease-in-out infinite
    &:hover
      border-radius 50px
  .mask
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.1) 30%, rgba(0,0,0,.15) 50%, rgba(0,0,0,.1) 70%, transparent 100%)
    z-index -1
  .text
    height 40%
    width 70%
    a
      color white
      transition .2s all ease-in-out
      text-shadow 0 0 30px #333
      &:hover
        text-decoration none
        text-shadow 0 0 50px black
      &.profile:hover
        color cIpurple
      &.home:hover
        color cItealBlue
      &.categories:hover
        color cIgreen
      &.tags:hover
        color cPrimary
      &.about:hover
        color cWarning
      &.github:hover
        color cGithub
      &.linkedin:hover
        color cLinkedin
      &.rss:hover
      &.email:hover
        color cIorange
      &.search:hover
        color cIgreen
    .name
      font-size 2em
    ul
      list-style none
      padding-left 0
      font-size 1.5em
      line-height 2
      width 100%
        
@media (max-width 768px)
  aside
    left -300px
    .text
      height 60%
// @keyframes polygon-ani
//   50% 
//     border-radius 50px
    //clip-path polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)
  
</style>
