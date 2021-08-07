const { getErrMessage } = require('./errCode')

module.exports = {
  userLocationInfo: {},
  setLocationInfo: (params) => {
    console.log('setLocationInfo', params)
    return getErrMessage(0)
  }
}
