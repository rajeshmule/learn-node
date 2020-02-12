const User = require('../models/users');

exports.addUser = function (req, res)
{
    const userData = req.body
    User.create(userData, (err, user) =>
    {
        if (err) return res.json({ message: "err", err })
        return res.json(user)
    })
}

exports.listOfAllUsers = function (req, res)
{
    User.find((err, users) =>
    {
        if (err) return res.json({ message: "err", err })
        return res.json(users)
    })
}

exports.getDetailOfUser = function (req, res)
{
    const id = req.params.id;

    User.findById(id, (err, user) =>
    {
        if (err) return res.json({ message: "err", err })
        return res.json(user)
    })
}

exports.editDetailOfUser = function (req, res, next)
{
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) =>
    {
        if (err) return res.json(err);
        res.json(user);
    });
}


exports.deleteUser = function (req, res)
{
    const id = req.params.id;

    User.findByIdAndRemove(id, (err, user) =>
    {
        if (err) return res.json({ message: "err", err });
        res.json(user);
    });

}