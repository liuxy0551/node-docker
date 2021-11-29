/**
 * 容器相关
 */
const Router = require('koa-router')
const ContainerController = require('../../controller/container')
const Container = new Router()

Container.get('/getContainers', ContainerController.getContainers)

module.exports = Container
