/**
 * 容器相关
 */
const Router = require('koa-router')
const ContainerController = require('../../controller/container')
const Container = new Router()

Container.get('/getContainers', ContainerController.getContainers)
Container.get('/getRunningContainers', ContainerController.getRunningContainers)
Container.post('/createContainer', ContainerController.createContainer)
Container.post('/copyFileToContainer', ContainerController.copyFileToContainer)
Container.post('/execContainer', ContainerController.execContainer)
Container.post('/deleteContainer', ContainerController.deleteContainer)

module.exports = Container
