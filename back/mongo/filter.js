const user = ['_id', 'username', 'displayName', 'email', 'avatar', 'role', 'bio', 'createAt', 'updateAt', 'hidden']

function filterUser (select) {
  if (!select || typeof select !=='string') return user.join(' ')
  let _select = ''
  for (e in user) {
    if (select.includes(e)) _select += e+' '
  }
}

module.exports =  { user, filterUser }
