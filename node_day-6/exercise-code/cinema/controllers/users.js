const Users = require('../models/users');

exports.newUserForm = (req, res) =>
{
    res.render('newUserForm');
}