var passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user.model');

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/github/callback"
        },
        function (accessToken, refreshToken, profile, done)
        {
            console.log(profile._json.email, profile._json.name);

            // profile has all information from the user
            // Do save some profile information in local database
            // return cb
            // if user -> cb(null, user)
            // if error -> cb(null, false)
            // return done(null, profile);
            var data = {
                email: profile._json.email,
                name: profile._json.name
            }
            User.create({ data }, function (err, user)
            {
                return cb(err, user);
            });
        }
    )
);
passport.serializeUser(function (user, done)
{
    done(null, user.id);
});

passport.deserializeUser(function (id, done)
{
    User.findById(id, function (err, user)
    {
        done(err, user);
    });
});   