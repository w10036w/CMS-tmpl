const { api } = require('../../common')
const { expect, equal } = require('chai')


it('Welcome', done => {
  api.get('/').then(d => {
    expect(d.data).to.have.property('env')
    expect(d.data).to.have.property('info')
    expect(d.data).to.have.property('authentication')
    done()
  })
})