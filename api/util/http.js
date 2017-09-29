/**
 * @param {number} [code=200] 
 * @param {string} [note=''] 
 * @param {any} data 
 * @returns 
 */
function json (code=200, note='', data) {
  if(code === 200) {
    if (!data) data = note;
    return { code, data }
  }
  else if (code === 204) note = note || 'Content Not Found'
  else if (code === 400) note = note || 'Bad Request' // syntax error
  else if (code === 401) note = note || 'Unauthorized'
  else if (code === 403) note = note || 'Forbidden'
  else if (code === 405) note = note || 'Invalid Input'
  else if (code === 500) note = note || 'Internal Server Error'
  return { code, note };
};

module.exports = { json }