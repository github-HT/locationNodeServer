const router = require('koa-router')()
const jwt = require('node-jsonwebtoken')
const jwtAuth = require('koa-jwt')
const { createUserInfo } = require('../models/register.js')
const { checkLogin, checkLoginDevice } = require('../models/login.js')
const { getErrMessage } = require('../models/errCode.js')
const { setLocationInfo } = require('../models/locations.js')

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
      exp: Math.floor(Date.now() / 1000) + 60 * 60
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
  const info = checkLoginDevice({ userInfo: ctx.state.user.data })
  if (info.code !== 0) {
    ctx.body = info
    return
  }
  ctx.body = {
    message: 'suc',
    user: ctx.state.user.data || {}
  }
})

router.post('/location/info/load', jwtAuth({
  secret
}), async ctx => {
  const body = ctx.request.body
  const userInfo = ctx.state.user.data
  const info = checkLoginDevice({ userInfo })
  if (info.code !== 0) {
    ctx.body = info
    return
  }

  ctx.body = setLocationInfo({ userInfo, locationData: body })
})

module.exports = { router, secret }
