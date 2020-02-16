const Users = require('../models/user.model');

exports.newUserForm = (req, res) =>
{
    res.render('newUserForm');
}