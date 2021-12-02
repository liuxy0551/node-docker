/**
 * 执行命令并返回结果
 */
const shell = require('shelljs')

const runCommand = (app, command) => {
    return new Promise((resolve, reject) => {
        app.emit('log-info', `Command is: ${ command }`)
        const result = shell.exec(command)
        const { code, stdout, stderr } = result
        app.emit('log-info', `Command result is: ${ JSON.stringify({ code, stdout, stderr }) }`)
        if (code === 0) return resolve(stdout || stderr)
        reject(stderr)
    })
}

module.exports = {
    runCommand
}
