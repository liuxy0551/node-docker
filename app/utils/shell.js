/**
 * 执行命令并返回结果
 */
const shell = require('shelljs')

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        console.log(`Command is: ${ command }`)
        const result = shell.exec(command)
        const { code, stdout, stderr } = result
        // console.log('Command result is: ', { code, stdout, stderr })
        if (code === 0) return resolve(stdout || stderr)
        reject(stderr)
    })
}

module.exports = {
    runCommand
}
