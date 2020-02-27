var express = require('express');
var router = express.Router();

const controller = require('../controllers/user.controller');


router
  .route('/register')
  .post(controller.register);

router
  .route('/login')
  .post(controller.login);

module.exports = router;
