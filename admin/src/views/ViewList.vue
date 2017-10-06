<template lang="slm">
.view.view-list
  el-row.right
    router-link :to="'/create/'+opts.model" 
      el-button type="success" CREATE

  el-table :data="fmtedList" v-loading.body="loading" :default-sort="{ prop: 'createAt', order: 'ascending' }" stripe="" border="" @selection-change="selectItem"
    el-table-column type="selection" width="55"
    template v-for="e in opts.columns"
      el-table-column v-if="e==='hidden'" :prop="e" :label="capitalize(e)" :width="90"
      el-table-column v-else-if="e==='avatar'" :label="capitalize(e)" :width="85" inline-template=""
        img :src="row.avatar" height="40"
      el-table-column v-else-if="e==='username'" :label="capitalize(e)" inline-template="" :width="120"
        template
          router-link :to="'/'+opts.model+'/'+row._id" {{ row.username }}
      el-table-column v-else-if="e==='title'" :label="capitalize(e)" inline-template=""
        template
          router-link :to="'/'+opts.model+'/'+row._id" {{ row.title }}
          a.preview :href="appHost+opts.model+'/'+row.path" target="_blank" 
            i.el-icon-search
      el-table-column v-else-if="e==='author'" :label="capitalize(e)" :width="gWidth(e)" sortable="" inline-template=""
        router-link v-if="row.author" :to="'/user/'+row.author._id" {{ row.author.displayName }}
      el-table-column v-else-if="e==='tags'" :label="capitalize(e)" :width="gWidth(e)" inline-template=""
        template v-for="el in row.tags" v-if="row.tags"
          router-link v-if="el" :to="'/tag/'+el._id"
            el-tag type="primary" {{ el.name }}
      el-table-column v-else-if="e==='category'" :label="capitalize(e)" :width="gWidth(e)" sortable="" inline-template=""
        router-link v-if="row.category" :to="'/category/'+row.category._id" 
          el-tag type="success" {{ row.category.name }}
      // category / path
      el-table-column v-else-if="e==='name'" :label="capitalize(e)" :width="gWidth(e)" inline-template=""
        template
          router-link :to="'/'+opts.model+'/'+row._id" {{ row.name }}
          a.preview :href="appHost+opts.model+'/'+row.path" target="_blank" 
            i.el-icon-search
      el-table-column v-else="" :prop="e" :label="capitalize(e)" :width="gWidth(e)" sortable=""
    el-table-column label="Operation" :context="_self" width="190" inline-template=""
      span
        el-button @click="editItem(row, $index)" type="info" :plain="true" size="small" EDIT
        el-button @click="removeItem(row, $index)" type="danger" v-if="authed._id!==row._id" size="small" REMOVE
</template>
<script>
import { mapGetters } from 'vuex'
import { capitalize, fmtDateyymdhms } from '~u/filters'
import bar from '~u/bar'

export default {
  props: ['opts'],
  data: () => ({
    selection: [],
  }),
  computed: {
    ...mapGetters({
      loading: 'loading',
      list: 'list',
      authed: 'auth/authed'
    }),
    fmtedList () {
      const filters = this.opts.columns
      return this.list.map(e => {
        const o = { _id: e._id }
        if (e.path) o.path = e.path
        if (e.hidden) o.hidden = e.hidden
        filters.forEach(k => {
          if (e.hasOwnProperty(k)) {
            if (k==='createAt'||k==='updateAt') o[k] = fmtDateyymdhms(new Date(e[k]))
            else o[k] = e[k]
          }
        })
        return o
      })
    },
    appHost () { return window && ('//'+window.location.host.substr(6)+'/') } 
  },
  created () {
    bar.start()
    return this._fetch()
  },
  mounted () {},
  methods: {
    capitalize,
    _fetch () {
      let opts = this.opts
      if (this.opts.name === 'articles') {
        const populate = {
          author: '_id username displayName avatar',
          category: '_id name path',
          tags: '_id name path',
        }
        opts = Object.assign({ params: { populate } }, this.opts)
      }
      return this.$store.dispatch('fetch_list', opts)
        .then(() => bar.finish())
    },
    gWidth (e) {
      if (/title|email|username/i.test(e)) return 280
      else if (/tag|path|ateat/i.test(e)) return 180
      else if (/name|author|category/i.test(e)) return 150

      else if (/|avatar|role|hidden/i.test(e)) return 90
      return ""
    },
    selectItem (val) {
      this.selection = val.map(e => e._id)
    },
    editItem (row, index) {
      this.$router.push(`/${this.opts.model}/${row._id}`)
    },
    removeItem (row, index) {
      // popup confirmation
      this.$confirm(`Remove current ${this.opts.model} ?`, 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return this.$store.dispatch('remove_item', { name: this.opts.model, id: row._id })
      }).then(() => {
        this.$message({ type: 'success', message: 'Remove Successfully' })
        this._fetch()
      }).catch(() => {
        this.$message({ type: 'info', message: 'Action Cancelled' })
      })
    },
    removeAll () {
      //api.del('/admin/'+this.opts.name, this.selection.map(e => e._id))
      //this.selection

      this.$store.dispatch('remove_list', { name: this.opts.model, body: { ids: this.selection } })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
.view-list
  >.el-row
    margin-bottom 20px
  .el-table
    a
      &:hover
        color #50bfff
    .cell
      text-align left
      img
        text-align center
        vertical-align middle
      .el-tag
        margin-right 5px
    .el-icon-search
      margin-left 10px
      float right
      margin-top 5px
</style>
