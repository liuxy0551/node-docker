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
}

module.exports = new ContainerController()
