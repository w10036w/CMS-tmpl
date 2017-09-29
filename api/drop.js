const env = process.NODE_ENV || 'development'
if (env === 'test' || env === 'development') {
  // connect db and delete data

  console.log('DB is reseted')
} else {
  throw new Error('You can not run this script in production.')
}