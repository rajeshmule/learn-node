const express = require('express');
const router = express.Router();

const controller = require('../controllers/movies');


/* GET users listing. */
router
    .route('/new')
    .get(controller.addNewMovie)

module.exports = router;
