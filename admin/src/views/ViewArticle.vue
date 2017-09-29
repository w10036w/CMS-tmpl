<template lang="slm">
.view.view-test
  MarkdownEditor v-model="a"
</template>
<script>
import { MarkdownEditor } from 'markdown-it-editor'
import hljs from 'highlightjs'
import 'highlightjs/styles/github.css' 

export default {
  name: 'hello',
  components: { MarkdownEditor },
  data: () => ({
    a: 'hello world'
  }),
  props: [],
  watch: {},
  beforeMount () {},
  mounted () {},
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
</style>
