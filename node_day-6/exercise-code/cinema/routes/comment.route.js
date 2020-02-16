const express = require('express');
const router = express.Router();

const controller = require('../controllers/comment.controller');

router
    .route('/')
    .post(controller.newComment)

module.exports = router;