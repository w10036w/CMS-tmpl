exports._catch = e => {
  if (e.name && e.name==='CastError')
    return { error: 'DB read: ObjectId not exist'}
  else if (e.code && e.code===11000)
    return { error: 'DB create: duplicate key'}
  else return { error: `[DB ERROR] ${e.code}, ${e.name}`}
}