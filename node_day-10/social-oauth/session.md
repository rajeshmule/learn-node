# passport

passport is a npm package used for authenticating users through 3rd party applications like facebook, google, github etc..

passport uses Oauth for authentication. Oauth means open authentication.

Advantages are: 1. No extra registrations required 2. use trusted, existing 3rd party apps 3. Embedded session support

Entire authentiaction is a 5 step process, which uses passport module to send requests for authenticated information from 3rd party applications.

## step 1(create app)

create an oauth application with the provider. - go to their developers console - create an oauth application - specify redirect uris based on your routes in application - get clientId and secret from the application created.

ClientId and Secret obtained from application will be used on behalf of application for authentiacating users.

## step 2(define routes)

Create 2 seperate routes for handling authentication 1. For sending request to 3rp party application 2. callback url for handling success or failure conditions

```js
// route for sending request
router.get("/auth/:provider", passport.authenticate("provider"));
```

This route is used to send request to a specific provider.

As soon as this route is encountered, passport takes over and sends a request to the designated provider. It seacrches for a strategy defined for that provider.

```js
// route for handling success or failure
router.get(
  "/auth/:provider/callback",
  passport.authenticate("provider", { failureRedirect: "/login" }),
  function(req, res) {
    // success redirect
    res.redirect("/");
  }
);
```

This second route is handled when a success or failure occurs in the strategy defined for the provider.

## step 3(strategy)

As soon as request is made using passport, passport looks for a strategy to handle authentication.

It takes clientId, clientSecret and callbackURL and sends a request to 3rd party software for checking credentials.

Once credentials are correct, it gives user a consent screen to permit the application to login on their behalf, once permission is granted, entire user data is avalibale to the application in a callback function defined on strategy.

It provides accessToken, refreshToken , profile information and callback as last argument.

We can return from the strategy by passing into the last argumnet that is callback either a error or user.

Once callback is returned, it returns control to developer to deal with the profile information.

We can only return by passing success or error in callback function.

```js
var passport = require("passport");
// require passport-github to authenticate with github
// define github strategy
var GithubStrategy = require("passport-github").Strategy;

// use github strategy to authenticate with github
passport.use(
  new GithubStrategy(
    {
      clientId: "",
      clientSecret: "",
      callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // profile has all information from the user
      // Do save some profile information in local database
      // return cb
      // if user -> cb(null, user)
      // if error -> cb(null, false)
    }
  )
);
```

### serializer and deserializer

These function are provided to log a authenticated user into the session.

### serializer

As soon a a user is returned from strategy, it means a sucees redirect and serializer have access to the user information.

It takes the user info and creates a **passport.user** into the session and stores whatever is passed to the session.

```js
passport.serializeUser((user, done) => {
  done(err, user.id);
});
```

It takes authenticated user and done as callback and returns cb with error and user's id to be saved into session.

### deserilizer

It takes the passport.user from the session and retrieves the user back into request cycles to be used later.

```js
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err, false);
    done(null, user);
  });
});
```

It takes whatever is present in session, since we have saved id , it retrieves the user using user id and returns a done callback with user.

### middlewares

When an authenticated request is made, Express will load the session into the req, making our serialized user data available at _req.session.passport.user_.

```js
var passport = require("passport");
// place it after session have been defined

//check for a session in requiest
app.use(passport.initialize());
// If user found in session, passes to deserializer
app.use(passport.session());
```

Then, the first middleware, _initialize()_, will try to find that user in the request, or create it as an empty object if it doesn't exist (which would mean the user is not authenticated).

And then, _session()_ will kick in which to determine if the request is authenticated by trying to find a serialized object in it.

When it finds it, it'll pass it to deserializeUser which will use it to get the whole user data (maybe from the DB) and add it to req.user where we can use it to create other requests.

Even though serializeUser is only called on log in, deserializeUser is a global middleware that'll get executed on every single request to make the full user object available for authenticated requests.
