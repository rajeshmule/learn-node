// const User = require('../models/user.model');

let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) =>
{
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) =>
        {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

module.exports = {
    checkToken: checkToken
}

// module.exports = {
//     userLoggedSession: (req, res, next) =>
//     {
//         console.log("userLoggedSession session.userId => ", req.session.userId);
//         if (req.session && req.session.userId) {
//             var userId = req.session.userId;
//             User.findById(userId, (err, user) =>
//             {
//                 if (err) return next("Invalid userId in session");
//                 req.loggedUser = user;
//                 res.locals.loggedUser = user;

//                 console.log("inside findbyid and set after res.locals.loggedUser ", res.locals.loggedUser);

//                 next();
//             });
//         } else {
//             req.loggedUser = null;
//             res.locals.loggedUser = null;
//             next();
//         }
//     }
//     ,
//     //isAuthenticated
//     isUserLogged: (req, res, next) =>
//     {
//         console.log("inside userlogged (who are you?) =>  ", req.session.userId);
//         if (req.session && req.session.userId) {
//             next();
//         } else {
//             res.redirect('/users/signup');
//         }

//     }

// }