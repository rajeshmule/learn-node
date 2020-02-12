var express = require('express');
var router = express.Router();
const users = require("../controllers/users");

/* GET users listing. */
// /users
router
  .route('/')
  .post(users.addUser)
  .get(users.listOfAllUsers)

// /users/:id
router
  .route('/:id')
  .get(users.getDetailOfUser)
  .put(users.editDetailOfUser)
  .delete(users.deleteUser)

module.exports = router;
