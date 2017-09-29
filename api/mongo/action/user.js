const md = require('../models/user')
const { _catch } = require('../utils')

module.exports = {
  // never expose admin and hidden user to normal calls
  // cond = { _id, username, email }
  findOne: async cond => {
    const select = '_id username displayName email avatar role bio createAt'
    try {
      const data = await md.findOne(cond, select).exec()
      return { data }
    } catch (e) { return _catch(e) }
  },
}