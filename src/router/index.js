const router = require('koa-router')()
const jwt = require('node-jsonwebtoken')
const jwtAuth = require('koa-jwt')
const { createUserInfo } = require('../models/register.js')
const { checkLogin } = require('../models/login.js')
const { getErrMessage } = require('../models/errCode.js')

const secret = 'Is a location app secret'

router.post('/users/login', async ctx => {
  const userInfo = ctx.request.body
  if (!userInfo) {
    ctx.body = getErrMessage('-6')
    return
  }

  const checkInfo = checkLogin(userInfo)

  if (checkInfo.code !== 0) {
    ctx.body = checkInfo
    return
  }

  ctx.body = {
    ...checkInfo,
    token: jwt.sign({
      data: checkInfo.userInfo,
      exp: Math.floor(Date.now() / 1000) + 60
    }, secret)
  }
})

router.post('/users/register', async ctx => {
  const userInfo = ctx.request.body
  if (!userInfo) {
    ctx.body = getErrMessage('-6')
    return
  }
  const { userName, password } = userInfo
  const backInfo = createUserInfo({ userName, password })
  ctx.body = backInfo
})

router.get('/users/userinfo', jwtAuth({
  secret
}), async ctx => {
  ctx.body = {
    message: 'suc',
    user: ctx.state.user.data || {}
  }
})

router.get('/users/logout', jwtAuth({
  secret
}), async ctx => {
  console.log(ctx.state.user)
})

module.exports = { router, secret }
