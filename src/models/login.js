const { getErrMessage } = require('./errCode')
const { Users } = require('./register')
const CryptoJS = require('crypto-js')

const LoginDeviceId = {}

function checkUserName (userName) {
  const findUser = Users.find(item => {
    return item.userName === userName
  })
  if (findUser) {
    return {
      ...getErrMessage(0),
      userInfo: findUser
    }
  }
  return getErrMessage('-4')
}

function checkPassword (userInfo, password) {
  const pwd = CryptoJS.MD5(password).toString()
  if (userInfo.password === pwd) {
    return getErrMessage(0)
  } else {
    return getErrMessage('-5')
  }
}

function checkLogin ({ userName, password, deviceId }) {
  const checkUser = checkUserName(userName)
  if (checkUser.code !== 0) {
    return checkUser
  }

  const checkPass = checkPassword(checkUser.userInfo, password)
  if (checkPass.code === 0) {
    const userInfo = Object.assign({}, checkUser.userInfo)
    LoginDeviceId[userInfo.uid] = {
      deviceId: deviceId
    }
    userInfo.deviceId = deviceId
    delete userInfo.password
    return {
      ...checkPass,
      userInfo
    }
  }
  return checkPass
}

function checkLoginDevice ({ userInfo }) {
  const { uid } = userInfo
  const deviceId = userInfo.deviceId || ''
  let deviceInfo = LoginDeviceId[uid]
  if (deviceId && !deviceInfo) {
    deviceInfo = LoginDeviceId[uid] = { deviceId }
  }
  // 判断用户信息内的设备id和用户登录时的用户id，不想等的剔出
  if (deviceId !== (deviceInfo.deviceId)) {
    return getErrMessage('-401')
  }
  return getErrMessage(0)
}

module.exports = {
  checkLogin,
  LoginDeviceId,
  checkLoginDevice
}
