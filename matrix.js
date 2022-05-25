const https = require('https'), crypto = require('crypto')

const url = 'https://matrix.yzzx.org/srpc'
let _id = '', _secret = '', data = []

const HS256 = () => crypto.createHmac('sha256', _secret).update(JSON.stringify(data)).digest('base64url')

exports.setService = (id, secret) => {
  _id = id
  _secret = secret
}

function submit () {
  if (!data.length) return
  const req = request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
  req.write(JSON.stringify({ N: 'log', A: [_id, data, HS256()] }))
  data = []
  req.end()
}

exports.log = ctx => {
  data.push([Date.now(), ctx.IP, ctx.N, ctx.A])
  if (data.length > 100) submit()
}

exports.submit = submit
