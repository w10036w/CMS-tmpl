const md = require('../models/tag')
const md_article = require('../models/article')
const { _catch } = require('../utils')

module.exports = {
  findSortedTagsArticles: async () => {
    const select_article = "title author path tags category summary createAt hidden"
    const select = "_id name path"
    try {
      // TODO: what if many articles
      const tags = await md.find({}, select).exec() // [{ _id, name }, ...]
      const len = tags.length
      const articles = await md_article.find({ hidden: false }, select_article)
        .sort('-createAt')
        .populate('author', 'username displayName avatar')
        .exec()
      if (!len) return { data: [] }
      let data = tags.map(tag => ({ tag, articles: [] }))
      articles.forEach(article => {
        article.tags.forEach(t => {
          let i = 0
          while (i<len) {
            if (tags[i]._id.toString() === t.toString())
              data[i].articles.push(article)
            i++
          }
        })
      })
      data = data.filter(e => e.articles.length)
      data.sort((prev, next) => {
        const b = next.articles ? next.articles.length : 0
        const a = prev.articles ? prev.articles.length : 0
        return b - a
      })
      return { data }
    } catch (e) { return _catch(e) }
  },
}