const Users = require('../models/user.model');

exports.signUpForm = (req, res) =>
{


    res.render('signUp');
}
exports.signUp = async (req, res, next) =>
{
    try {
        const data = req.body;
        await Users.create(data);
        res.redirect('/users/signin')

    } catch (error) {
        next(error);
    }
}

exports.signInForm = (req, res) =>
{
    res.render('signIn');
}

exports.signIn = async (req, res, next) =>
{
    try {

        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return next(error);
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) return next(error)
        console.log("inside signin before push user.id into session => ", req.session.userId);
        // log the user in by adding user's id  it to session
        req.session.userId = user.id;
        console.log("inside signin after push user.id into session => ", req.session.userId);

        res.redirect('/dashboard')
    } catch (error) {
        next(error);
    }
}

exports.logout = (req, res, next) =>
{
    console.log("inside logout => ", req.session.userId);
    if (req.session) {
        // delete session object
        req.session.destroy(function (err)
        {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });

    }
}




