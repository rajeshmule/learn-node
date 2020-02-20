const User = require('../models/user.model');

module.exports = {
    userLoggedSession: (req, res, next) =>
    {
        console.log("userLoggedSession session.userId => ", req.session.userId);
        if (req.session && req.session.userId) {
            var userId = req.session.userId;
            User.findById(userId, (err, user) =>
            {
                if (err) return next("Invalid userId in session");
                req.loggedUser = user;
                res.locals.loggedUser = user;

                console.log("inside findbyid and set after res.locals.loggedUser ", res.locals.loggedUser);

                next();
            });
        } else {
            req.loggedUser = null;
            res.locals.loggedUser = null;
            next();
        }
    }
    ,
    //isAuthenticated
    isUserLogged: (req, res, next) =>
    {
        console.log("inside userlogged (who are you?) =>  ", req.session.userId);
        if (req.session && req.session.userId) {
            next();
        } else {
            res.redirect('/users/signup');
        }

    }

}