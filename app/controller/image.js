const ImageService = require('../service/image')

class ImageController {
    // 容器列表
    async getImages (ctx) {
        try {
            ctx.body = await ImageService.getImages(ctx)
        } catch (error) {
            ctx.body = error
        }
    }
}

module.exports = new ImageController()
