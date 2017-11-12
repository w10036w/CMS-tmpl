import io from 'axios'

// notice: if [GET], the body is { params } (if any)
function send ({ method='get', path, body, params }) {
  const uri = '/api' + path
  if (params && !body) body = { params }
  return io[method](uri, body)
    // .then(d => d)
    // .catch(e => {
    //   console.log('e: ',e )
    //   let msg
    //   if (e.response) msg = e.response.message
    //   else if (e.request) msg = e.request.message
    //   else msg = e.message
    //   console.error(`[API ${method.toUpperCase()}] ${msg}`)
    //   return e
    // })
}

export default {
  addAuth (token) {
    io.interceptors.request.use(config => {
      config.headers['authorization'] = token
      return config
    }, (error) => Promise.reject(error))
  },
  get: (path, params) => send({ path, params }),
  post: (path, body) => send({ path, body, method: 'post' }),
  patch: (path, body) => send({ path, body, method: 'patch'}),
  del: (path, body) => send({ path, body, method: 'delete'}),
}