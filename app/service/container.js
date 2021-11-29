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
            
            let containerList = []
            for (let i of list) {
                let arr = i.split('  ').filter(item => !!item).filter(item => !item.includes('->'))
                containerList.push({
                    CONTAINERID: arr[0],
                    IMAGE: arr[1],
                    COMMAND: arr[2],
                    CREATED: arr[3],
                    STATUS: arr[4],
                    NAMES: arr[5],
                })
            }

            return setCtxBody(200, containerList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }
}

module.exports = new ContainerService()
