const User = require('../models/User');

exports.newUserForm = (req, res) =>
{
    res.render('newUsersForm');
}

exports.listOfAllUsers = (req, res, next) =>
{
    console.log("inside ger users");
    User.find((err, users) =>
    {
        if (err) return next(err);
        res.render('listOfAllUsers', { users })
    });
}

exports.createNewUser = (req, res) =>
{
    const data = req.body;
    User.create(data, (err, createdUser) =>
    {
        if (err) return err;
        res.redirect('/users');
    });
}

exports.getDetailOfOneUser = (req, res, next) =>
{
    console.log("inside ger one user");
    const id = req.params.id;
    User.findById(id, (err, user) =>
    {
        if (err) return next(err);
        res.render('showUserDetail', { user });
    });
}

exports.deleteUser = (req, res) =>
{

    const id = req.params.id;
    User.findByIdAndDelete(id, (err, deletedUser) =>
    {
        if (err) return err;
        res.redirect('/users');
    })
}

exports.updateUserForm = (req, res) =>
{
    const id = req.params.id;

    User.findById(id, (err, user) =>
    {
        if (err) return next(err);
        res.render('updateUser', { user });
    });
}

exports.updateUser = (req, res) =>
{
    const id = req.params.id;
    const updateData = req.body;

    console.log(id, updateData);
    User.findByIdAndUpdate(id, updateData, (err, user) =>
    {
        if (err) return err;
        console.log('user is updated');
        res.redirect('/users');

    });
}