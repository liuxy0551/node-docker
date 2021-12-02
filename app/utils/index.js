/**
 * setCtxBody 设置 ctx.body
 */
 const Koa = require('koa')
 const app = new Koa()

// 成功状态码
const successCode = 200

const setCtxBody = (code = successCode, data = {}, message = '成功', extraParams = {}) => {
	let result = data
	if (code !== successCode) {
		app.emit('error', data)
		result = data.toString()
	}

	return {
		code,
		data: result,
		message,
		success: code === successCode,
		...extraParams
	}
}

module.exports = {
	setCtxBody
}
