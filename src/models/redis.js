
const redis = require('redis')
const redisClient = redis.createClient()

redisClient.on('error', function (error) {
  console.error(error)
})
module.exports = redisClient
