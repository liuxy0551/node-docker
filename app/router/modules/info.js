const Router = require('koa-router')
const InfoController = require('../../controller/info')
const Info = new Router()

Info.get('/getInfo', InfoController.getInfo)

module.exports = Info
