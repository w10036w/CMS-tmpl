export const ls = {
  set (k, v) {
    localStorage[k] = v
  },
  get (k) {
    return localStorage[k]
  }
}
// indexedDB
// export const idb = (([successCb, failCb]) => {
//   const db = window.indexedDB
//   const dbName = 'admin.arknodejs'
//   const version = 4
//   function open () {
//     db.open(dbName, version)
//   }
//   function close () {
//     db.close()
//   }
//   db.onerror = function (ev) {
//     failCb(ev)
//   }
//   db.onsuccess = function (ev) {
//     successCb(ev)
//   }
//   return {
//     open, close,

//   }
// })()