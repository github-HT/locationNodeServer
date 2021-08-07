require('@babel/register')

const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const kstatic = require('koa-static')
const cors = require('koa2-cors')

const { router } = require('./router/index')

app.keys = ['locations secert']

app.use(kstatic(__dirname, '/'))
app.use(bodyparser())
app.use(cors({
  origin: function (ctx) {
    return '*'
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 5,
  // credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE']
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// logger

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`, ctx.request.body, ctx.body)
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(router.routes())

app.listen(3000)
