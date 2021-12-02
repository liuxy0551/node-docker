const InfoService = require('../service/info')

class InfoController {
    async getInfo (ctx) {
        try {
            ctx.body = await InfoService.getInfo(ctx)
        } catch (error) {
            ctx.body = error
        }
    }
}

module.exports = new InfoController()
