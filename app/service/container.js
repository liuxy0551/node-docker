const { setCtxBody } = require('../utils')
const { runCommand } = require('../utils/shell')
const { mkdirFolder, writeFileSync } = require('../utils/fs')

class ContainerService {
    // 容器列表
    async getContainers (ctx) {
        try {
            const result = await runCommand('docker ps -a')
            const containerList = ContainerService.getContainersFunc(result)
            return setCtxBody(200, containerList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 正在运行的容器列表
    async getRunningContainers (ctx) {
        try {
            const result = await runCommand('docker ps')
            const containerList = ContainerService.getContainersFunc(result)
            return setCtxBody(200, containerList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 创建并后台运行容器
    async createContainer (ctx) {
        try {
            const { username, projectName } = ctx.request.body
            const result = await runCommand(`docker run -itd --name ${ username }_${ projectName }_node node:12.22.7`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 复制主机的文件到容器内
    async copyFileToContainer (ctx) {
        try {
            const { username, projectName, repositoryUrl, containerName } = ctx.request.body
            await mkdirFolder(username)
            await writeFileSync(username, projectName, repositoryUrl)
            // return setCtxBody(200)
            const result = await runCommand(`docker cp base-files/${ username } ${ containerName }:/mnt/`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 进入容器并运行脚本
    async execContainer (ctx) {
        try {
            const { containerName, shFile = '' } = ctx.request.body
            const result = await runCommand(`docker exec ${ containerName } /bin/bash ${ shFile }`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 删除容器
    async deleteContainer (ctx) {
        try {
            const { containerName } = ctx.request.body
            const result = await runCommand(`docker rm -f ${ containerName }`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 处理容器的数据
    static getContainersFunc (result) {
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
        return containerList
    }
}

module.exports = new ContainerService()
