const { setCtxBody } = require('../utils')

class InfoService {
    async getInfo (ctx) {
        return setCtxBody(200, `node-docker`)
    }
}

module.exports = new InfoService()
