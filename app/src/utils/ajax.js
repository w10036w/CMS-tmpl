function _get(url, cb) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE)
      cb(xhr.status === 200 ? false : new Error(xhr.status), xhr.responseText)
  }
  xhr.open('GET', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
}

module.exports = {
  get (uri, { params }) {
    if (typeof params !== 'undefined') {
      const query = Object.keys(params).map(k => `${k}=${encodeURI(params[k])}`).join('&')
      uri = `${uri}?${query}`
    }
    return new Promise((resolve, reject) => {
      _get(uri, (err, data) => {
        if (err) reject(err)
        try { resolve({ status: 200, data: JSON.parse(data) }) } 
        catch (err) { reject(err) }
      })
    })
  }
}
