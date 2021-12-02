/**
 * 生成脚本文件
 */
const fs = require('fs')
const { runCommand } = require('./shell')
const { fsPath, serverPath, bashFileName } = require('../../config/app.config')

// 创建文件夹
const mkdirFolder = async (app, folderName) => {
    try {
        await runCommand(app, `mkdir -p ${ fsPath }/${ folderName }`)
    } catch (error) {
        app.emit('error', `${ folderName } 文件夹创建失败`)
        app.emit('error', error)
    }
}

// 写入文件
const writeFileSync = async (app, username, projectName, repositoryUrl) => {
    const path = `${ fsPath }/${ username }/${ bashFileName }`
    const commandList = [`cd /${ serverPath }/${ username }`, `rm -rf ${ projectName }`, `git clone ${ repositoryUrl }`, `cd ${ projectName }`]
    const content = commandList.map(item => `${ item }\n`).join('')

    try {
        fs.writeFileSync(path, content)
        app.emit('log-info', `${ path } 文件写入成功`)
    } catch (error) {
        app.emit('error', `${ path } 文件写入失败`)
        app.emit('error', error)
    }
}
    

module.exports = {
    mkdirFolder,
    writeFileSync
}
