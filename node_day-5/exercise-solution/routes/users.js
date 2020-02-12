const router = require('express').Router();
const users = require("../controllers/users");

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