const { expiresIn } = resolve('conf')
const { getToken, encode, verify, decode } = resolve('util/token')
const User = resolve('mongo').models.user

const login = async (ctx, next) => {
  let _user, user
  let { username, password } = ctx.request.body
  if (!username || !password) 
    return ctx.throw(401, 'invalid username or password')
  
  try {
    let _user = await User.findOne({ username })
    if (_user && _user.verify(password) && !_user.hidden) {
      user = {
        username: _user.username,
        role: _user.role,
      }
      let token = encode(user)
      let key = `token_${user.username}`
      return ctx.body = { token, user }
    }
  } catch (err) {
    return ctx.throw(500, 'database_error ', { err }) ;
  }
  return ctx.throw(401, 'invalid username or password')
}

const logout = async (ctx, next) => {

}

module.exports = r => {
  r.post('/login', login)
}