/**
 * 执行命令并返回结果
 */
const shell = require('shelljs')

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        const result = shell.exec(command)
        const { code, stdout, stderr } = result

        // console.log('run command result: ', { code, stdout, stderr })
        if (code === 0) return resolve(stdout || stderr)
        reject(stderr)
    })
}

module.exports = {
    runCommand
}
