/**
 * 书籍相关
 */
const Router = require('koa-router')
const BookController = require('../../controller/book')
const Book = new Router()

Book.post('/createBook', BookController.createBook)
Book.post('/updateBook', BookController.updateBook)
Book.post('/deleteBook', BookController.deleteBook)
Book.post('/deleteBooks', BookController.deleteBooks)
Book.get('/getBooks', BookController.getBooks)
Book.get('/getBook', BookController.getBook)
Book.get('/getBookTypes', BookController.getBookTypes)

module.exports = Book
