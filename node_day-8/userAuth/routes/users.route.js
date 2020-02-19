var express = require('express');
var router = express.Router();

const controller = require('../controllers/users.controller');



router
  .route('/signup')
  .get(controller.signUpForm)
  .post(controller.signUp)



router
  .route('/signin')
  .get(controller.signInForm)
  .post(controller.signIn)

router.get('/logout', controller.logout);


module.exports = router;
