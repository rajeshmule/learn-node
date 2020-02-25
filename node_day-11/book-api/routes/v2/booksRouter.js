var express = require('express');
var router = express.Router();

const controller = require('../../controllers/books.controller')

router
    .route('/')
    .post(controller.createBook)
    .get(controller.listOfAllBooks)

router
    .route('/:id')
    .get(controller.getOneBook)
    .delete(controller.removeBook)
    .put(controller.editBook)

module.exports = router;