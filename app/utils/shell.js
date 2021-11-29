/**
 * 执行命令并返回结果
 */
const shell = require('shelljs')

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        const { code, stdout, stderr } = shell.exec(command)
        if (code === 0) return resolve(stdout)
        reject(stderr)
    })
}

module.exports = {
    runCommand
}
