const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');


/* GET users listing. */
router
  .route('/new')
  .get(controller.newUserForm)

module.exports = router;
