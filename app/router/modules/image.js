/**
 * 容器相关
 */
const Router = require('koa-router')
const ImageController = require('../../controller/image')
const Image = new Router()

Image.get('/getImages', ImageController.getImages)

module.exports = Image
