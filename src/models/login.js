const { getErrMessage } = require('./errCode')
const { Users } = require('./register')
const CryptoJS = require('crypto-js')

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

function checkLogin ({ userName, password }) {
  const checkUser = checkUserName(userName)
  if (checkUser.code !== 0) {
    return checkUser
  }

  const checkPass = checkPassword(checkUser.userInfo, password)
  if (checkPass.code === 0) {
    delete checkUser.userInfo.password
    return checkUser
  }
  return checkPass
}

module.exports = {
  checkLogin
}
