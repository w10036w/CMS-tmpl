<template lang="slm">
.bg-mousemove.bg-img-cover.expanded-full :style="bgImg+bgPosition"
</template>
<script>
import { evListen } from '~u/window'

export default {
  name: 'bg-mousemove',
  components: {  },
  props: ['bg'],
  data: () => ({
    defaultBg: '/static/jpg/temple.jpg',
    bgX: 0,
    bgY: 0,
    ticking: false,
  }),
  computed: {
    bgImg () { return  `background-image: url(${this.bg || this.defaultBg });` },
    bgPosition () { return `background-position: ${this.bgX}vw ${this.bgY}vh` } 
  },
  props: [],
  watch: {},
  methods: {
    bgMove (ev) {
      !this.ticking && requestAnimationFrame(() => {
        this.ticking = true
        this.bgX += -ev.movementX/500
        this.bgY += -ev.movementY/500
        this.ticking = false
      })
    }
  },
  mounted () {
    evListen('mousemove', this.bgMove)
  },
  beforeDestroy () {
    evListen('mousemove', this.bgMove, false)
  }
}
</script>
<style lang="stylus" scoped>
.bg-mousemove
  transform scale(1.15)
  filter blur(1px)
  z-index -1
</style>
