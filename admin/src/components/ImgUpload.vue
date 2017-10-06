<template lang="slm">
.widget.widget-img-upload
  el-upload action="//up.qbox.me" :data="form" :show-file-list="true" :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload" :on-preview="onPreview" list-type="picture"
    el-button size="small" type="primary" UPLOAD
    .el-upload__tip slot="tip" jpg, jpeg, png <1MB; Click to copy to Clipboard
</template>
<script>
import { copyToClipboard } from '~u/window'
export default {
  name: 'widget-img-upload',
  props: ['model'],
  data: () => ({
    links: {},
    form: {},
    host: ''
  }),
  watch: {},
  beforeMount () {},
  mounted () {},
  methods: {
    onPreview (file) {
      const text = this.model === 'article' ?
        `<p><img height="400" src="${this.links[file.uid]}"></p>`
        : this.links[file.uid]
      if (copyToClipboard(text))
        this.$message({
          type: 'success',
          message: 'Copied to Clipboard Successfully'
        })
      else {
        this.$message.error('Copied to Clipboard Successfully')
      }
    },
    onRemove (file, fList) {
    },
    onError (resp, file, fList) {
      this.$message({
        type: 'danger',
        message: 'Upload Unsuccessfully. ' + resp.toString()
      })
    },
    onSuccess (resp, file, fList) {
      const link = `${this.host}/${encodeURI(this.form.key)}`
      this.links[file.uid] = link
      this.$message({
        type: 'success',
        message: 'Upload Successfully'
      })
    },
    beforeUpload (file) {
      const name = encodeURI(`${new Date().toISOString().substr(0, 10).replace(/-/g,'')}/${file.name}`)
      return this.$store.dispatch('qiniu_token', name)
        .then(r => {
          if (!r) this.$notify.error({ title: 'Fail', message: 'Qiniu Token Not Generated'})
          const { token, key, host } = r
          this.host = host
          this.form = { key, token }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.widget-img-upload
  width 100%
  min-height 300px
</style>
