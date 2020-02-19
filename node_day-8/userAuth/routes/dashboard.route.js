var express = require('express');
var router = express.Router();
var controller = require('../controllers/dashboard.controller');

/* GET home page. */
router.get('/', controller.getDashboard);

module.exports = router;