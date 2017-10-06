import { evListen } from '@u/window'

const mx = {
  data: () => ({
    ticking: false,
    scrollY: 0,
  }),
  methods: {
    _scrollNavHide () {
      if (this.ticking) return;
      !this.ticking && window.requestAnimationFrame(() => {
        if (window.scrollY > this.scrollY)
          this.scrollNavHide = true
        else
          this.scrollNavHide = false
        this.scrollY = window.scrollY
        this.ticking = false
      })
      this.ticking = true
    }
  },
  mounted () {
    if (this.md.mobile) evListen('scroll', this._scrollNavHide)
  },
  beforeDestroy () {
    if (this.md.mobile) evListen('scroll', this._scrollNavHide, false)
  }
}

export default mx