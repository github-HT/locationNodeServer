const CryptoJS = require('crypto-js')
const { getErrMessage } = require('./errCode')

let UIdStartValue = 10001
function getUId () {
  return ++UIdStartValue
}

const Users = [{
  uid: 10001,
  userName: '123456',
  password: '14e1b600b1fd579f47433b88e8d85291',
  tm: 1628175253607,
  name: '',
  age: '',
  sex: ''
}]

function checkUserName (userName) {
  const idx = Users.findIndex(item => {
    return item.userName === userName
  })
  if (idx > -1) {
    return getErrMessage('-3')
  }
  return getErrMessage(0)
}

function createUserInfo ({ userName, password }) {
  const checkUser = checkUserName(userName)
  if (checkUser.code !== 0) {
    return checkUser
  }
  const uid = getUId()
  const pwdForMD5 = CryptoJS.MD5(password).toString()
  const tm = Date.now()
  const info = {
    uid, // 用户唯一id
    userName, // 用户名
    password: pwdForMD5, // 密码
    tm, // 注册时间（ms）
    name: '', // 姓名
    age: '', // 年龄
    sex: '' // 性别
  }

  Users.push(info)
  return getErrMessage(0)
}

module.exports = {
  createUserInfo,
  Users
}
