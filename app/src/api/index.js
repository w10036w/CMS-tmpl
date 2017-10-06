//import axios from 'axios'
import { createAPI } from 'create-api'

const api = createAPI()

export function _get(key, uri, params) {
  if (!uri && !params) uri = key
  if (api.onServer && api.cachedItems.has(key))
    return Promise.resolve(api.cachedItems.get(key))
  uri = api.pref + uri
  if (api.onServer) console.log(`[Server][${key}]`, uri)
  return api.get(uri, { params }).then(resp => {
    if (api.onServer && resp.status)
      if (resp.status === 200) api.cachedItems.set(key, resp)
    return resp
  }).catch(e => {
    if (e.response) console.error('[API1] ', { code: e.response.status, rqst: uri })
    else if (e.request) console.error('[API2] ')
    else console.error('[API3] ', e.message)
    return e.response
  })
}