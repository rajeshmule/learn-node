var express = require('express');
var router = express.Router();

const controller = require('../controllers/articles.controller');


router
    .route('/')
    .get(controller.articles)

module.exports = router;