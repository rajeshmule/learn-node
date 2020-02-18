#### controllers

Controllers are the convention, where we extract all the logic from the routes and put it at a seperate place in a folder called controllers.

This makes the routing cleaner and easy to handle on a later period of time when we encounter a large number of routes.

General convention of routes is:

```js
router.get('/dashboard', (req, res) => {
    Model.find({query}, callback => {
        if(err) // handle error
        // send appropriate response 
    })
})
```

If we have multiple routes this way, after handling 6 to 10 routes, router file gets cluttered and its hard to recognize and differentiate it later.

To avoid this, we shift entire ligic to controller, all the routing information and middlewares are present in the routes.

For example:
```js
var userController = require('../controllers/userController');
// routes looks like
router.get('/dashboard', userController.dashboard);

// controller is like
exports.dashboard = (req, res) => {
    Model.find({query}, callback => {
        if(err) // handle error
        // send appropriate response 
    });
}
```
Folder structure is
    routes
        - users.js
    controllers
        - userController.js

Here, all the user related routes are handled by userController file located inside
controller folder. This makes routing clean and easy to handle.

##### practice 
handle all user realted router logic inside userController.

##### locals
locals is an object availbale on the response which makes variable defined inside locals available to the templates which are rendered inside this request cycle.

```js
app.use((req, res, next) => {
    res.locals.name = "qwerty";
    next();
})
```

##### practice
set your name in response locals and try to access it in templates

#### basic authorization

Authorization is where we provide access rights or authority to a group of users for a specific piece of resource in our application.

For example, if we have a blog site, then only a logged in user is authorized to create a blog or add comment on any other blog.

Once a user is logged in, we can check for his session to verify logged in user, once verified we can authorize him to create a blog or add comment.

One way possible is for each resourec, we can check session and redirect him accordingly.

```js
router.use('/dashboard', (req, res) => {
    if(req.session && req.session.userId) {
        res.render('dashboard')
    } else {
        res.redirect('/users/login');
    }
})
```

##### practice
  - render '/users' routes only when a user is logged in, otherwise redirect to login or index page

The other method is, we create a authorization middleware that checks for a session and redirects accordingly. This authorization middleware will be created once, used where ever needed.

```js
var isUserLogged = (req, res, next) => {
    if(req.session && req.session.userId) {
        next()
    } else {
        res.redirect('/users/login')
    }
}
```

Now, on a specific route, if we want to check for logged in user, all we have to do is to plug above middleware in between routes and controller action.

```js
router.get('/dashboard', isUserLogged, userController.dashboard)
``` 

We can place this middleware wherever logged in user is required.

If we want to implement authorization middleware on all the routes in a file, place it at the top before handling any routes. Before any route is called, it will pass through auth middleware.

```js
// authorization middleware
router.use(isUserLogged);

// Now check all the routes
router.get('/' ...)
router.post('/', ...) etc..
```

##### practice
create a middleware for checking logged in user
    - if logged, call next()
    - if not, redirect to login page
    - plug this middleware on all routes other than login and register.


#### user session middleware

One better approach to fetch logged in user details is to place a session middleware in app.js, which checks for a logged in session, as soon as application starts, before handling any request on one of the routes.

If a session is found, it retrieves user from session information and populates it in *request* as well as *locals* so that logged in user can be used in subsequent request handlers and also inside the templates.


Ideally we create a util folder in root of project and create a file named sessions.js to store all the middleware for checking sessions.


utils
  - userSession.js

Alternatively, we can define these middleware functions inside a controller named `authController.js`.


```js
// inside userSession.js
// require user model
var User = require('../models/User');
exports.userLoggedSession = (req, res, next) => {
    if(req.session && req.session.userId) {
        var userId = req.session.userId;
        User.findById(userId, (err, user) => {
            if(err) return next('Invalid userId in session');
            // if user
            // put user into request object
            req.loggedUser = user;
            res.locals.loggedUser = user;
            next();
        })    
    } else {
        req.loggedUser = null;
        res.locals.loggedUser = null;
        next()
    }
}
```

Now, we can place **userSession** in app.js to check for a logged in session, if yes, it is going to provide user details in subsequent requests as well as locals for templates to access it.

```js
// in app.js before handling routes
// require at the top
var userSession = require('./utils/userSession');
app.use(userSession.userLoggedSession);

app.use('/', indexRoutes);
app.use('/users', userRoutes);
```

Now we can access logged in user details on any routes by calling *req.loggedUser*.

If a user is logged in, we will get entire user back or null when no user is logged in.

We can also access user information in any templates, since we have also set user object in locals. It will return entire user object if logged in or null otherwise.

##### practice
create a session middleware
    - check for a user logged session
    - if present, fetch user information using userId present in session by calling            User.findByID
        - 

### partials
partials are reusable template component which can be used with other templates when required.

we can create a partials for header and footer component and use them in multiple templates when required.

structure looks like
views
    - partials(folder)
        - header.ejs
        - footer.ejs
    - index.ejs

If we want to use partials in index.ejs file, we can include it like:
```js
    // in index.ejs
    // first include header.ejs
    <% include partials/header %>
    // add content for index.ejs
    <h1>Welcome to dashboard</h1>
    // Include footer from partials
    <% include partials/footer %>

```

##### practice
create a header.ejs partial and display logged in user information, if user is logged else show login and register button.




