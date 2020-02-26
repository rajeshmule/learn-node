var express = require('express');
var router = express.Router();

const controller = require('../controllers/user.controller');


router
  .route('/signup')
  .post(controller.signup);

router
  .route('/login')
  .post(controller.login);

module.exports = router;
