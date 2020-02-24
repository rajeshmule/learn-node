var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done)
    {
        // we will just use the profile object returned by GitHub
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done)
{
    // placeholder for custom user serialization
    done(null, user);
});

passport.deserializeUser(function (user, done)
{
    // placeholder for custom user deserialization.
    // maybe you are getoing to get the user from mongo by id?

    done(null, user); // null is for errors
});
