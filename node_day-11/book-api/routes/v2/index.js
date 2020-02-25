var express = require('express');
var router = express.Router();

var booksRouter = require('./booksRouter')

router.use('/books', booksRouter);

module.exports = router;