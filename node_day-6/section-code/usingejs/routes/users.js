var express = require('express');
var router = express.Router();

const users = require('../controllers/users');

router
    .route('/new')
    .get(users.newUserForm)

router
    .route('/')
    .post(users.createNewUser)
    .get(users.listOfAllUsers)

router
    .route('/:id')
    .get(users.getDetailOfOneUser)

router
    .route('/delete/:id')
    .get(users.deleteUser)

router
    .route('/update/:id')
    .get(users.updateUserForm)
    .post(users.updateUser)

module.exports = router;