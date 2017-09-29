const { customApi, api, gText, schemas } = require('../../common')
const { expect, equal } = require('chai')

const defAdmin = {}
Object.entries(schemas.auth.Login).forEach(e => {
  defAdmin[e[0]] = e[1].value
})

describe('Auth Admin', () => {
  const type = 'post'
  const desc1 = gText.desc(type, '/login', 'Login to the application')
  describe(desc1, () => {
    it('200: Logged', done => {
      api.post('/login', defAdmin).then(d => {
        for (key in schemas.auth.Logged) {
          expect(d.data).to.have.property(key)
        }
        done()
      })
    })
    it('405: only username', done => {
      api.post('/login', { username: 'admin' })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
    it('405: only password', done => {
      api.post('/login', { password: 'admin' })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
    it('405: non-existing username', done => {
      api.post('/login', { username: 'Ofjwdz2q13rczva', password: 'asdf' })
        .catch(e => {
          expect(e.response.status).to.equal(405)
          done()
        })
    })
  })
  const desc2 = gText.desc('get', '/verify', 'Verify the token in header[authorization]')
  describe(desc2, () => {
    it('200: Logged', done => {
      api.post('/login', defAdmin)
      .then(d => {
        return customApi({ headers: { 'Authorization': d.data.token } })
          .get('/verify')
      }).then(d => {
        for (key in schemas.auth.Logged) {
          expect(d.data).to.have.property(key)
          if (key === 'role') expect(d.data[key]).to.equal('admin')
        }
        done()
      })
    })
    it('401: No header[authorization]', done => {
      api.get('/verify')
        .catch(d => {
          expect(d.response.status).to.equal(401)
          done()
        })
    })
    it('401: Invalid header[authorization]', done => {
      customApi({ headers: { 'Authorization': 'asdf' } }).get('/verify')
        .catch(d => {
          expect(d.response.status).to.equal(401)
          done()
        })
    })
  })
})