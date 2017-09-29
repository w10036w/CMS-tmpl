const { customApi, api, schemas } = require('../../common')
const { expect, equal } = require('chai')

const defAdmin = {}, userCreate = {}
Object.entries(schemas.auth.Login).forEach(e => defAdmin[e[0]] = e[1].value)
Object.entries(schemas.user.UserCreate).forEach(e => userCreate[e[0]] = e[1].value)

describe('Public User APIs', () => {
  describe('[GET] /user?_id|username|email', () => {
    it('200: by username', done => {
      api.get('/user?username=editor1')
        .then(d => {
          for (key in schemas.user.UserPublic) {
            expect(d.data).to.have.property(key)
          }
          done()
        })
    })
    it('204: no matched user', done => {
      api.get('/user?username=editor2')
        .then(d => {
          expect(d.status).to.equal(204)
          done()
        })
    })
    it('204: admin user is ignored', done => {
      api.get('/user?username=admin')
        .then(d => {
          expect(d.status).to.equal(204)
          done()
        })
    })
    it('405: missing query', done => {
      api.get('/user')
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
  })
})


describe('Admin User APIs', () => {
  let headers
  // prepare the authed token in headers of { headers }
  before(async () => {
    await api.post('/login', defAdmin).then(d => {
      headers = { Authorization: d.data.token }
    })
  })
  // [POST] /admin/user
  describe('[POST] /admin/user [admin only]', () => {
    it('201: new User', done => {
      api.post('/admin/user', userCreate, { headers })
        .then(d => {
          for (key in schemas.user.User) {
            expect(d.data).to.have.property(key)
          }
          done()
        })
    })
    it('401: Unauthorized', done => {
      api.post('/admin/user', userCreate)
        .catch(e => {
          expect(e.response.status).to.equal(401)
          done()
        })
    })
    it('405: duplicated username', done => {
      api.post('/admin/user', userCreate, { headers })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
    it('405: empty / missing username', done => {
      const _userCreate = Object.assign({}, userCreate, { username: '' })
      // userCreate.username = undefined
      // delete userCreate.username
      api.post('/admin/user', _userCreate, { headers })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
    it('405: empty / missing email', done => {
      const _userCreate = Object.assign({}, userCreate, { email: '' })
      // userCreate.email = undefined
      // delete userCreate.email
      api.post('/admin/user', _userCreate, { headers })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
    // remove the tmp test data
    after(() => {
      const params = { username: userCreate.username }
      api.delete('/admin/user', { params, headers }) 
    })
  })
  // [GET] /admin/user
  describe('[GET] /admin/user [admin only]', () => {
    it('200: User', done => {
      const params = { 
        criteria: JSON.stringify({ username: 'admin' }),
        select: (() => Object.keys(schemas.user.UserFindOne).join(' '))()
      }
      api.get('/admin/user', { params, headers })
        .then(d => {
          for (key in schemas.user.UserFindOne) {
            schemas.user.UserFindOne.has && expect(d.data).to.have.property(key)
          }
          done()
        })
    })

  })
})
