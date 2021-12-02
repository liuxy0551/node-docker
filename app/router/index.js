/**
 * 模块化处理router
 */
const Router = require('koa-router')
const BookController = require('./modules/book')
const ImageController = require('./modules/image')
const ContainerController = require('./modules/container')

const router = new Router()

/**
 * 启动路由
 * allowedMethods, 在所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
 */
module.exports = app => {
    // 验证消息的确来自微信服务器
    router.get('/', ctx => { ctx.body = 'hello node-docker' })
    
    router.use('/book', BookController.routes(), BookController.allowedMethods())
    router.use('/container', ContainerController.routes(), ContainerController.allowedMethods())
    router.use('/image', ImageController.routes(), ImageController.allowedMethods())

    app.use(router.routes(), router.allowedMethods())
}
