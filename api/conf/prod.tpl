const { debug, prefix, port, expiresIn } = resolve('package').config

module.exports = {
  debug,
  prefix,
  port,
  expiresIn,
  gaId: '',
  secret: '',
  mongo: {
    host: '127.0.0.1:27017/arkcms',
    pass: ''
  },
  redis: {
    host: '127.0.0.1:6379',
    pass: ''
  },
  defaultAdmin: {
    username: 'admin',
    displayName: 'admin',
    password: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/3350260?v=3'
  },
  qn: {
    accessKey: '',
    secretKey: '',
    host: '',
    bucket: ''
  }
}
