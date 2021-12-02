const { setCtxBody } = require('../utils')
const { runCommand } = require('../utils/shell')
const { mkdirFolder, writeFileSync } = require('../utils/fs')
const { imageName, fsPath, serverPath, bashFileName } = require('../../config/app.config')

class ContainerService {
    // 容器列表
    async getContainers (ctx) {
        try {
            const result = await runCommand(ctx.app, 'docker ps -a')
            const containerList = ContainerService.getContainersFunc(result)
            return setCtxBody(200, containerList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 正在运行的容器列表
    async getRunningContainers (ctx) {
        try {
            const result = await runCommand(ctx.app, 'docker ps')
            const containerList = ContainerService.getContainersFunc(result)
            return setCtxBody(200, containerList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 1、创建并后台运行容器
    async createContainer (ctx) {
        try {
            const { username, projectName } = ctx.request.body
            const containerName = `${ username }_${ projectName }_node`
            const result = await runCommand(ctx.app, `docker run -p 9000:9000 -itd --name ${ containerName } ${ imageName }`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 2、生成脚本文件并复制到容器内
    async copyFileToContainer (ctx) {
        try {
            const { username, projectName, repositoryUrl } = ctx.request.body
            const containerName = `${ username }_${ projectName }_node`
            await mkdirFolder(ctx.app, username)
            await writeFileSync(ctx.app, username, projectName, repositoryUrl)
            const result = await runCommand(ctx.app, `docker cp ${ fsPath }/${ username } ${ containerName }:/${ serverPath }/`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 3、进入容器并运行脚本
    async execContainer (ctx) {
        try {
            const { username, projectName } = ctx.request.body
            const containerName = `${ username }_${ projectName }_node`
            const shFile = `/${ serverPath }/${ username }/${ bashFileName }`
            const result = await runCommand(ctx.app, `docker exec ${ containerName } /bin/bash ${ shFile }`)
            return setCtxBody(200, result)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 4、删除容器
    async deleteContainer (ctx) {
        try {
            const { username, projectName } = ctx.request.body
            const containerName = `${ username }_${ projectName }_node`
            const result = await runCommand(ctx.app, `docker rm -f ${ containerName }`)
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
