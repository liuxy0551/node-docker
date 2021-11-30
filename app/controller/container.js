const ContainerService = require('../service/container')

class ContainerController {
    // 容器列表
    async getContainers (ctx) {
        try {
            ctx.body = await ContainerService.getContainers(ctx)
        } catch (error) {
            ctx.body = error
        }
    }

    // 正在运行的容器列表
    async getRunningContainers (ctx) {
        try {
            ctx.body = await ContainerService.getRunningContainers(ctx)
        } catch (error) {
            ctx.body = error
        }
    }

    // 创建并后台运行容器
    async createContainer (ctx) {
        try {
            ctx.body = await ContainerService.createContainer(ctx)
        } catch (error) {
            ctx.body = error
        }
    }

    // 删除容器
    async deleteContainer (ctx) {
        try {
            ctx.body = await ContainerService.deleteContainer(ctx)
        } catch (error) {
            ctx.body = error
        }
    }

    // 进入容器并运行脚本
    async execContainer (ctx) {
        try {
            ctx.body = await ContainerService.execContainer(ctx)
        } catch (error) {
            ctx.body = error
        }
    }

    // 复制主机的文件到容器内
    async copyFileToContainer (ctx) {
        try {
            ctx.body = await ContainerService.copyFileToContainer(ctx)
        } catch (error) {
            ctx.body = error
        }
    }
}

module.exports = new ContainerController()
