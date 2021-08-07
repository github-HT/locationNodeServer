const errMessage = {
  0: '成功！',
  '-1': '账号不符合规范！',
  '-2': '密码不符合规范！',
  '-3': '用户名已存在！',
  '-4': '用户不存在！',
  '-5': '密码错误！',
  '-6': '参数错误！',
  '-401': '身份认证失败！'
}
module.exports = {
  getErrMessage: (code) => {
    return {
      code,
      message: errMessage[code]
    }
  }
}
