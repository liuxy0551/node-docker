const Koa = require('koa')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const compress = require('koa-compress')
const { appPort } = require('./config/app.config')
const middles = require('./app/middleWares')
const router = require('./app/router')
const log4js = require('./logger/log4js')

const app = new Koa()

app.use(logger())
app.use(compress({
    threshold: 1024 // 超过大小即压缩，bytes
}))  
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        maxFileSize: 100 * 1024 * 1024    // 设置上传文件大小最大限制，默认100M
    }
}))

// 启动自定义中间件
middles(app)

// 启动路由
router(app)

// app错误监听
app.on('error', (err) => {
    log4js.logError(err)
})
// 主动打印日志
app.on('log-info', (info) => {
	log4js.logInfo(info)
})

app.listen(appPort, () => {
    app.emit('log-info', `app runs on port ${ appPort }`)
})
