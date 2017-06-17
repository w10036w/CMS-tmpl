function mongoTry (fn, note, action='exec') {
  try { 
    let data = await fn[action]() 
    return { data }
  } catch (err) {
    log.error(note, err)
    return { err }
  }
}
