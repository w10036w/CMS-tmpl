import { get } from '@u/ajax'
//import { apiHost } from '@config'

export function createAPI () {
  return {
    get,
    pref: '/api',
  }
}
