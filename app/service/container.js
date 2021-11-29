const { setCtxBody } = require('../utils')
const { runCommand } = require('../utils/shell')

class ContainerService {
    // 容器列表
    async getContainers (ctx) {
        try {
            const result = await runCommand('docker ps -a')
            const list = result.split('\n')
            list.shift()
            list.pop()
            
            for (let i of list) {
                console.log(i)
            }

            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }
}

module.exports = new ContainerService()
