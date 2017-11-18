import { get } from '@u/ajax'

export function createAPI () {
  return {
    get,
    pref: '/api',
  }
}
