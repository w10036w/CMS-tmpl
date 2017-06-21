const qiniu = require('qiniu')
const { bSigned } = resolve('middleware/auth')
const { qn } = resolve('conf')

if (!qn.accessKey || !qn.secretKey || !qn.host || !qn.bucket)
  log.error('[QINIU] conf.qn unconfigured, please get your keys to enable image upload.')

qiniu.conf.ACCESS_KEY = qn.accessKey;
qiniu.conf.SECRET_KEY = qn.secretKey;

// not processed...
//let fops = 'imageView2/0/q/75|imageslim'
let fops = ''

const policy = (name, fileName) => {
	let encoded = new Buffer(`${qn.bucket}/${fileName}`).toString('base64')
  let persist = {
    persistentOps: `${fops}|saveas/${encoded}`,
  }
	return Object.assign({}, persist, {
		scope: name,
		deadline: new Date().getTime() + 600,
    mimeLimit: 'image/*',
    fsizeLimit: 1048576 // 1MB
		// insertOnly: 1,
	})
}

function genToken (ctx) {
  if (!qn.accessKey || !qn.secretKey || !qn.host || !qn.bucket)
    return ctx.throw()
  const { name } = ctx.query
  if (!name) return ctx.throw(400, 'invalid query: name')
	let key = `${qn.bucket}:${name}`
	let putPolicy = new qiniu.rs.PutPolicy2(policy(key, name));
	let token = putPolicy.token();
	if (!token) return ctx.throw(500)
	const data = {
		token,
		key: name,
		host: qn.host,
	};
	return ctx.body = data
}

module.exports = r => {
  r.post('/qiniu/token', bSigned, genToken)
}
