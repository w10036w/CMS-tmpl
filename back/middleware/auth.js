const { json } = resolve('util/http')
//const cache = resolve('cache')
const { getToken, verify, decode } = resolve('util/token')

let token = '', ctxUser, tokenUser

exports.bSigned = (ctx, next) => {
  token = getToken(ctx)
  if (verify(token)) {
    tokenUser = decode(token).payload
    ctx.state.user = tokenUser
    return next ? next() : true
  }
  return ctx.throw(401, { user: null })
}

exports.bAdmin = (ctx, next) => {
  ctxUser = ctx.state.user
  token = getToken(ctx)
  if (ctxUser)  {
    if (ctxUser.role === 'admin')
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'admin') {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.throw(403, { user: ctx.state.user })
}
exports.bAdminOrEditor = (ctx, next) => {
  ctxUser = ctx.state.user
  token = getToken(ctx)
  if (ctxUser)  {
    if (ctxUser.role === 'admin' || ctxUser.role === 'editor')
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'admin' || tokenUser.role === 'editor') {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.throw(403, { user: ctx.state.user })
}
exports.bAdminOrSelf = (ctx, next) => {
  ctxUser = ctx.state.user
  const uid = ctx.params.id
  if (!uid) return ctx.throw(400, 'missing params: id')
  token = getToken(ctx)
  if (ctxUser)  {
    if (ctxUser.role === 'admin' || ctxUser._id === uid)
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'admin' || tokenUser._id === uid) {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.throw(401, 'access denied', { user: ctx.state.user })
}

exports.bEditor = (ctx, next) => {
  ctxUser = ctx.state.user
  token = getToken(ctx)
  if (ctxUser)  {
    if (ctxUser.role === 'editor')
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'editor') {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.throw(401, 'access denied', { user: ctx.state.user })
}

exports.bSignOff = (ctx, next) => {
  token = getToken(ctx)
  if (!verify(token))
    return next ? next() : true
  else return ctx.redirect('/') // go homepage if signed
}
