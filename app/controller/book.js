const BookService = require('../service/book')

class BookController {
  // 添加书籍
  async createBook (ctx) {
    try {
      ctx.body = await BookService.createBook(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 编辑书籍
  async updateBook (ctx) {
    try {
      ctx.body = await BookService.updateBook(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 删除书籍
  async deleteBook (ctx) {
    try {
      ctx.body = await BookService.deleteBook(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 批量删除书籍
  async deleteBooks (ctx) {
    try {
      ctx.body = await BookService.deleteBooks(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 获取书籍列表
  async getBooks (ctx) {
    try {
      ctx.body = await BookService.getBooks(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 获取某个书籍详情
  async getBook (ctx) {
    try {
      ctx.body = await BookService.getBook(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 获取书籍种类详情
  async getBookTypes (ctx) {
    try {
      ctx.body = await BookService.getBookTypes(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new BookController()
