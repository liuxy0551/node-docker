/**
 * 生成脚本文件
 */
const fs = require('fs')
const { runCommand } = require('./shell')
const { fsPath, serverPath, bashFileName } = require('../../config/app.config')

// 创建文件夹
const mkdirFolder = async (folderName) => {
    try {
        await runCommand(`mkdir -p ${ fsPath }/${ folderName }`)
    } catch (error) {
        console.log(`${ folderName } 文件夹创建失败，${ error }`)
    }
}

// 写入文件
const writeFileSync = async (username, projectName, repositoryUrl) => {
    const path = `${ fsPath }/${ username }/${ bashFileName }`
    const commandList = [`cd /${ serverPath }/${ username }`, `rm -rf ${ projectName }`, `git clone ${ repositoryUrl }`, `cd ${ projectName }`]
    const content = commandList.map(item => `${ item }\n`).join('')

    try {
        fs.writeFileSync(path, content)
        console.log(path, '文件写入成功')
    } catch (error) {
        console.log(path, '文件写入失败，', error)
    }
}
    

module.exports = {
    mkdirFolder,
    writeFileSync
}
