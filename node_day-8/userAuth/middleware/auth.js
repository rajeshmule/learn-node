const User = require('../models/user.model');

module.exports = {
    userInfo: (req, res, next) =>
    {
        console.log("inside auth.userInfo 1");
        next();
    },
    userLoggedSession: (req, res, next) =>
    {
        if (req.session && req.session.userId) {
            var userId = req.session.userId;
            User.findById(userId, (err, user) =>
            {
                if (err) return next("Invalid userId in session");
                req.loggedUser = user;
                res.locals.loggedUser = user;
                next();
            });
        } else {
            req.loggedUser = null;
            res.locals.loggedUser = null;
            next();
        }
    }
    ,

    isUserLogged: (req, res, next) =>
    {
        // console.log("inside who are you?", req.session && req.session.userid);
        if (req.session && req.session.userId) {
            next();
        } else {
            res.redirect('/users/signup');
        }

    }

}