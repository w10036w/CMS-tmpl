<template lang="slm">
.view.view-item
  el-row :gutter="20"
    template v-if="opts.name==='user'"
      el-col :span="16"
        el-form label-width="90px" :model="current" v-if="current"
          el-form-item label="Username"
            el-input v-model="current.username"
          el-form-item label="DisplayName"
            el-input v-model="current.displayName"
          el-form-item label="Password" v-if="opts.type && opts.type==='create'"
            el-input v-model="current.password"
          el-form-item label="Email"
            el-input v-model="current.email"
          el-form-item label="Avatar"
            el-input v-model="current.avatar"
          el-form-item label="Role"
            el-select placeholder="Choose" v-model="current.role"
              el-option label="admin" value="admin"
              el-option label="editor" value="editor"
          el-form-item label="Bio"
            el-input v-model="current.bio"
    template v-else-if="opts.name==='article'"
      el-col :span="18"
        el-form label-width="80px" :model="current" v-if="current"
          el-form-item label="Title"
            el-input v-model="current.title"
          el-row :gutter="20"
            el-col :span="20"
              el-form-item label="Path"
                el-input v-model="current.path"
            el-col :span="4"
              el-form-item label-width="0"
                el-checkbox v-model="customizePath" Customize Path
          // el-form-item label="Thumbnail"
          //   el-input v-model="current.thumbnail" placeholder="image url"
          el-row :gutter="20"
            el-col :span="8"
              el-form-item label="Category"
                el-select placeholder="Category" v-model="current.category"
                  el-option v-for="e in categoryList" :key="e._id" :label="e.name" :value="e._id"
            el-col :span="16"
              el-form-item label="Tags"
                el-select.tag-select multiple="" placeholder="Tags" v-model="current.tags"
                  el-option v-for="e in tagList" :key="e._id" :label="e.name" :value="e._id"
          el-form-item label="MODE"
            el-radio-group v-model="mode"
              el-radio-button label="edit" EDIT
              el-radio-button label="split" SPLIT
              el-radio-button label="preview" PREVIEW
          .flex.md-editor
            .flex-1.md-text v-if="md_col[0]" :span="md_col[0]"
              textarea v-model="current.content"
            .flex-1.md-body v-if="md_col[1]" :span="md_col[1]"
              div v-html="md_content"
    template v-else-if="opts.name==='tag'||opts.name==='category'" 
      el-col :span="16"
        el-form label-width="80px"
          el-form-item label="Name"
            el-input v-model="current.name"
          el-form-item label="Path"
            el-input v-model="current.path"
    el-col :span="opts.name==='article'?6:8" v-if="current"
      el-form label-width="100px"
        el-form-item label-width="20px"
          el-button-group
            el-button type="success" v-if="id" :disabled="!edited" @click="update" UPDATE
            el-button type="success" v-else="" @click="create" PUBLISH
            el-button type="primary" @click="save" SAVE LOC
            el-button type="danger" v-if="id" @click="remove" REMOVE
        el-form-item label="Created" v-if="id"
          .date.t-center {{ current.createAt | fmtDateyymdhms }}
        el-form-item label="Updated" v-if="id"
          .date.t-center {{ current.updateAt | fmtDateyymdhms }}
        el-form-item label="Hidden"
          el-switch v-model="current.hidden"
        el-form-item label="Comment" v-if="opts.name==='article'"
          el-switch v-model="current.allowComment"
</template>
<script>
import { mapGetters } from 'vuex'
import { marked } from '~u/marked'
import { urlize } from '~u/filters'

export default {
  props: ['opts'],
  data: () => ({
    current: null,
    categoryList: [],
    tagList: [],
    customizePath: false,
    mode: 'edit'
  }),
  computed: {
    id () { return this.$route.params.id },
    ...mapGetters({
      item: 'item',
      authed: 'auth/authed'
    }),
    edited () {
      for (let k in this.current) {
        if (this.current[k] !== this.item[k]) {
          return true
        }
      }
      return false
    },
    md_content () {
      return marked(this.current.content)
    },
    md_col () {
      if (this.mode === 'edit') return [24, 0]
      else if (this.mode === 'preview') return [0, 24]
      else return [12, 12]
    }
  },
  watch: {
    'current.title' () {
      if (!this.customizePath) {
        this.current.path = urlize(this.current.title)
      }
    },
    'current.name' () {
      this.current.path = urlize(this.current.name)
    },
    'current.content' () {
      this.current.summary = this.current.content.length > 100 ? 
        (this.current.content.substr(100) + '...') : this.current.content
    }
  },
  created () {
    if (this.opts.type === 'create') this._initCurrent()
    else this._fetch()
  },
  methods: {
    _initCurrent () {
      if (this.opts.name === 'user') {
        this.current = { 
          username: '', displayName: '', password: '', email: '', avatar: '', 
          role: 'editor', bio: '', hidden: false, allowComment: true }
      } else if (this.opts.name === 'article') {
        this.current = {
          title: '', path: '',
          author: '', category: '', tags: [],
          summary: '', content: '', hidden: false
        }
        this._fetchCateTags()
      } else {
        this.current = { name: '', path: '', hidden: false }
      }
    },
    // save to localStorage
    save () {

    },
    _fetchCateTags () {
      this.$store.dispatch('fetch_list', { name: 'categories' }).then(list => {
        this.categoryList = list
      })
      this.$store.dispatch('fetch_list', { name: 'tags' }).then(list => {
        this.tagList = list
      })
    },
    _fetch () {
      const opts = Object.assign({}, this.opts, { id: this.id })
      if (opts.name === 'article') this._fetchCateTags()
      this.$store.dispatch('fetch_item', opts).then(item => {
        this.current = Object.assign({}, item)
      })
    },
    create () {
      this.$store.dispatch('create_item', { name: this.opts.name, body: this.current })
        .then(d => {
          if (d) {
            this.$notify({ title: 'Success', type: 'success', message: `Current ${this.opts.name} is created.`})
            this._initCurrent()
          } else {
            this.$notify.error({ title: 'Fail', message: `Current ${this.opts.name} is not created` })
          }
        })
    },
    update () {
      this.$store.dispatch('update_item', { id: this.id, name: this.opts.name, body: this.current })
        .then(d => {
          if (d) {
            this.$notify({ title: 'Success', type: 'success', message: `Current ${this.opts.name} is updated` })
            this.current.updateAt = d.updateAt
          } else 
            this.$notify.error({ title: 'Fail', message: `Current ${this.opts.name} is not updated` })
        })
    },
    remove () {
      this.$confirm(`Remove current ${this.opts.name}?`, 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return this.$store.dispatch('remove_item', { id: this.id })
      }).then(d => {
        if (d) {
          this.$notify.error({ title: 'Fail', message: `Current ${this.opts.name} is not removed` })
        } else {
          this.$notify({ title: 'Success', type: 'success', message: `Current ${this.opts.name} is removed.`})
          this.$router.push(`/create/${opts.name}`)
        }
      }).catch(() => {
        this.$message({ type: 'info', message: 'Action Cancelled' })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.view-item
  .tag-select
    width 100%
  .md-editor
    border 1px solid cPrimary
    border-radius 4px
    overflow hidden
  .md-text
  .md-body
    font-size 90%
    min-height 500px
    max-height 700px
    padding 5px
  textarea
  .md-body
    &::-webkit-scrollbar-track
      -webkit-box-shadow inset 0 0 6px rgba(cPrimary,0.3)
      background-color white
    &::-webkit-scrollbar
	    width: 10px
	    background-color cPrimary
    &::-webkit-scrollbar-thumb
	    background-color: cPrimary
  textarea
    width 100%
    height 100%
    border none
    overflow-y visible
    background-color transparent
  .md-text
    background-color rgba(#e1e1e1, .2)
  .md-body
    overflow-y scroll
</style>
