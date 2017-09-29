const { expiresIn } = resolve('conf')
const { getToken, encode, verify, decode } = resolve('util/token')
const User = resolve('mongo').models.user

/**
 *  @swagger
 *  definitions:
 *    Login:
 *      type: object
 *      required: [username, password]
 *      properties:
 *        username:
 *          type: string
 *          example: admin
 *        password:
 *          type: string
 *          example: admin
 *    Logged:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: generated jsonwebtoken
 *        _id:
 *          type: string
 *          format: objectId
 *        username:
 *          type: string
 *        role:
 *          type: string
 */

/**
 *  @swagger
 *  /login:
 *    post:
 *      summary: Login to the application
 *      operationId: login
 *      tags: [Auth]
 *      parameters:
 *        - name: body
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Login'
 *      responses:
 *        200:
 *          description: Success, return a Logged Object
 *          schema:
 *            $ref: '#/definitions/Logged'
 *        401:
 *          description: invalid username or password
 */
async function login (ctx) {
  let _user, user
  let { username, password } = ctx.request.body
  if (!username || !password) 
    return ctx.throw(405, 'invalid username or password')
  
  try {
    let _user = await User.findOne({ username })
    if (_user && _user.verify(password) && !_user.hidden) {
      user = {
        _id: _user._id,
        username: _user.username,
        role: _user.role,
      }
      let token = encode(user)
      // let key = `token_${user.username}`
      return ctx.body = { token, ...user }
    }
    // to not expose to malicious detection
    ctx.throw(405, 'invalid username or password')
    // return ctx.throw(204)
  } catch (err) {
    ctx.throw(405, err) ;
  }
}

// for redis
async function logout (ctx) {

}

/**
 *  @swagger
 *  /verify:
 *    get:
 *      summary: Verify the token in header[authorization]
 *      tags: [Auth]
 *      parameters:
 *        - name: Authorization
 *          description: token
 *          in: header
 *          required: true
 *          type: string
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWI0M2Q3MDRjNzFiNjgxMmJlMmQwMmQiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTA1MDYxMTg5fQ.4lSIOpNXTh2TeWObWwlUxEUWO53Z_FMWWX-QpDiWR8A
 *      responses:
 *        200:
 *          description: Success, return a Logged Object
 *          schema:
 *            $ref: '#/definitions/Logged'
 *        401:
 *          description: invalid token
 */
async function verify_token (ctx) {
  let token = getToken(ctx)
  if (!verify(token)) return ctx.throw(401, 'invalid token')
  let user = decode(token).payload
  return ctx.body = { token, ...user }
}
module.exports = r => {
  r.post('/login', login)
  // r.post('/logout', logout)
  r.get('/verify', verify_token)

}