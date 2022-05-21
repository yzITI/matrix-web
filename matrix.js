const https = require('https'), crypto = require('crypto')

const url = 'https://matrix.yzzx.org/srpc'
let _name = '', _secret = '', data = []

const HS256 = () => crypto.createHmac('sha256', _secret).update(JSON.stringify(data)).digest('base64url')

exports.setService = (name, secret) => {
  _name = name
  _secret = secret
}

function submit () {
  if (!data.length) return
  const req = request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
  req.write(JSON.stringify({ N: 'log', A: [_name, data, HS256()] }))
  data = []
  req.end()
}

exports.log = ctx => {
  data.push([Date.now(), ctx.IP, ctx.N, ctx.A])
  if (data.length > 100) submit()
}

exports.submit = submit
