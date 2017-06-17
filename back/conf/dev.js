const { debug, prefix, port, expiresIn } = resolve('package').config

module.exports = {
  debug,
  prefix,
  port,
  expiresIn,
  gaId: '',
  secret: 'IUHEF9w4bv2q83$@%#',
  mongo: {
    host: '127.0.0.1:27017/arkcms',
    pass: '12345'
  },
  redis: {
    host: '127.0.0.1:6379',
    pass: '12345'
  },
  defaultAdmin: {
    username: 'admin',
    displayName: 'admin',
    password: 'admin',
    email: 'admin@arknodejs.com',
    role: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/3350260?v=3'
  },
  qn: {
    accessKey: 'KYl6qbnTMM3EqdMn-00pBjG8-C6U3POtK6SSaHLX',
    secretKey: '6NJagznOWGTq1Y3tpkpjkk_stGJJTkbVYLEtztLp',
    host: 'https://om1lnfu9j.qnssl.com/',
    bucket: 'arkblog'
  }
}
