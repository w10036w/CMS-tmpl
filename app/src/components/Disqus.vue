<template lang="slm">
	#disqus_thread
</template>
<script>

export default {
  data: () => ({
    shortname: 'arknodejs'
  }),
  props: ['update'],
  watch: {
    update () {
      this.init(window.DISQUS)
    }
  },
  methods: {
    reset(dsq) {
      console.log('disqus reset')
      const self = this
      dsq.reset({
        reload: true,
        config: function() {
          this.page.identifier = (self.$route.path || window.location.pathname)
          this.page.url = self.$el.baseURI
        }
      })
    },
    init(disqus) {
      if (disqus) {
        return this.reset(disqus)
      }
      console.log('disqus init')
      const self = this
      window.disqus_config = function() {
        this.page.identifier = (self.$route.path || window.location.pathname)
        this.page.url = self.$el.baseURI
      }
      setTimeout(() => {
        let d = document
        let s = d.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.setAttribute('id', 'embed-disqus')
        s.setAttribute('data-timestamp', +new Date())
        s.src = `//${this.shortname}.disqus.com/embed.js`
        ;(d.head || d.body).appendChild(s)
      }, 0)
    }
  }
}
</script>