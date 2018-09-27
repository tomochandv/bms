import path from 'path'

import Koa from 'koa'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import session from 'koa-session'
import views from 'koa-views'
import serve from 'koa-static'
import favicon from 'koa-favicon'

import router from './router'
import config from '../../config'

const app = new Koa()

// Real ip get
app.proxy = true

// koa-session config
app.keys = ['secretSessionKey']
app.use(session({
  key: 'koa:sess',
  maxAge: 21600000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}, app))

app.use(logger())
app.use(koaBody())

app.use(serve(path.join(__dirname, '../../dist')))
app.use(favicon(path.join(__dirname, '../../dist/favicon.ico')))

// views
const render = views(path.resolve(__dirname, '../client/views'), {
  extension: 'ejs',
})
app.use(render)

// router
app.use(router.routes())

app.listen(config.listenPort, () => console.log(`server started http://localhost:${config.listenPort}`))

export default app

// 프로그램 실행 환경 변수 설정
process.env.NODE_ENV = process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() === 'development' ? 'development' : 'production'

// 프로세스 실행 시간 기준으로 cache 갱신
global.cache = (new Date()).valueOf().toString()
