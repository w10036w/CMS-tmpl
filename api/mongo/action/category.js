const md = require('../models/category')
const md_article = require('../models/article')
const { _catch } = require('../utils')

module.exports = {
  findSortedCategoriesArticles: async () => {
    const select_article = "title author path category tags summary createAt hidden"
    const select = "_id name path"
    try {
      // TODO: what if many articles
      const categories = await md.find({}, select).exec() // [{ _id, name }, ...]
      const len = categories.length
      const articles = await md_article.find({ hidden: false }, select_article)
        .sort('-createAt')
        .populate('author', 'username displayName avatar')
        .exec()
      if (!len) return { data: [] }
      let data = categories.map(category => ({ category, articles: [] }))
      articles.forEach(article => {
        let i = 0
        while (i<len) {
          if (categories[i]._id.toString() === article.category.toString())
            data[i].articles.push(article)
          i++
        }
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