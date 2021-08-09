const { getErrMessage } = require('./errCode')
const redisClient = require('./redis')

module.exports = {
  userLocationInfo: {},
  setLocationInfo: ({ userInfo, locationData }) => {
    console.log('setLocationInfo', userInfo, locationData)
    redisClient.hmset('LOCATION_INFO_' + userInfo.uid, {
      [locationData.timestamp]: JSON.stringify({
        uid: userInfo.uid,
        accuracy: locationData.accuracy || 0,
        altitude: locationData.altitude || 0,
        heading: locationData.heading || 0,
        latitude: locationData.latitude || 0,
        longitude: locationData.longitude || 0,
        speed: locationData.speed || 0,
        timestamp: locationData.timestamp || 0
      })
    }, err => {
      console.log('redisClient set LOCATION_INFO error', err)
    })
    return getErrMessage(0)
  }
}
