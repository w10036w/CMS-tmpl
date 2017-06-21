function json (code=200, note='', data) {
  if(code < 204) {
    if (!data) data = note;
    return { code, data }
  }
  else if (code === 204) return { code }
  else if (code === 400) note = note || 'Bad Request'
  else if (code === 401) note = note || 'Unauthorized'
  else if (code === 403) note = note || 'Forbidden'
  else if (code === 500) note = note || 'Internal Server Error'
  return { code, note };
};

module.exports = { json }