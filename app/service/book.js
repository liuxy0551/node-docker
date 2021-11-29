const { setCtxBody } = require('../utils')

class BookService {
  // 新增书籍
  async createBook (ctx) {
    try {
      let { name, price, type, date } = ctx.request.body
      const book = await db.Book.create({ bookId: getUuid(), name, price, type, date })
      return setCtxBody(200, book.bookId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 编辑书籍
  async updateBook (ctx) {
    try {
      let { bookId, name, price, type, date } = ctx.request.body
      await db.Book.update({ name, price, type, date }, { where: getWhere({ bookId }) })
      return setCtxBody(200, bookId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 删除书籍
  async deleteBook (ctx) {
    try {
      const { bookId } = ctx.request.body
      await db.Book.update({ isDelete: 1 }, { where: getWhere({ bookId }) })
      return setCtxBody(200, bookId, '删除成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 批量删除书籍
  async deleteBooks (ctx) {
    try {
      const { bookIds } = ctx.request.body
      await db.Book.update({ isDelete: 1 }, { where: getWhere({ bookId: bookIds }) })
      return setCtxBody(200, '删除成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取书籍列表
  async getBooks (ctx) {
    try {
      const { offset, limit, page, pageSize } = getPage(ctx.query)
      const { name = '', startPrice, endPrice, startDate, endDate, type = '' } = ctx.query

      let where = getWhere()
      name && (where.name = { [Op.substring]: name })
      startPrice && !endPrice && (where.price = { [Op.gte]: startPrice })
      !startPrice && endPrice && (where.price = { [Op.lte]: endPrice })
      startPrice && endPrice && (where.price = { [Op.between]: [startPrice, endPrice] })
      startDate && endDate && (where.date = { [Op.between]: [startDate, endDate] })
      type && (where.type = type)

      const { count, rows } = await db.Book.findAndCountAll({
        where,
        order: getOrder([['date', 'DESC']]),
        attributes: {
          exclude: getExclude(),
          include: getInclude(['date'])
        },
        offset,
        limit,
        raw: true
      })
      return setCtxBody(200, rows, '成功', { total: count, page, pageSize })
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取某个书籍详情
  async getBook (ctx) {
    try {
      const { bookId } = ctx.query
      const book = await db.Book.findOne({
        where: getWhere({ bookId }),
        attributes: {
          exclude: getExclude(),
          include: getInclude(['date'])
        }
      })
      return setCtxBody(200, book)
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取书籍种类详情
  async getBookTypes (ctx) {
    try {
      const { name = '' } = ctx.query
      let where = getWhere()
      name && (where.name = { [Op.substring]: name })

      const list = await db.BookType.findAll({
        where,
        attributes: {
          exclude: getExclude(),
          include: getInclude()
        },
        limit: 10,
        raw: true
      })
      return setCtxBody(200, list, '成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new BookService()
