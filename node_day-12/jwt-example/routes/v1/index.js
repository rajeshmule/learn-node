const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const { getCurrentUser } = require('../../controllers/user')
const { validateJWT } = require('../../modules/auth')


router.get('/', (req, res) =>
{
    res.json({ message: "Welcome to conduit API" })
});

router.get('/me', validateJWT, getCurrentUser)

router.use('/users', usersRouter);


module.exports = router;