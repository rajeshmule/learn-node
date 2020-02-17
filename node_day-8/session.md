#### cookies
Cookies are small files which are stored on a user's computer. They are designed to hold
 a modest amount of data specific to a particular client and website, and can be accessed
  either by the web server or the client computer. 

When you visit a website, the website sends the cookie to your computer. Your computer stores it in a file located inside your web browser.

The purpose of the computer cookie is to help the website keep track of your visits and activity. For example, many online retailers use cookies to keep track of the items in a user’s shopping cart as they explore the site.A website might also use cookies to keep a record of your most recent visit or to record your login information. 

We use cookie-parser in express to send and receive cookies from web browser.

```js
var cookieParser = require('cookie-parser');
// We place them as middleware, so that each request have access to cookies from the browser.
app.use(cookieParser());

```

Once we have cookie Parser in place, we can create a custom cookie.

```js
app.use((req, res, next) => {
    // this creates a cookie named username in browser with value 'xyz'.
    res.cookie('username', 'xyz');
})
```
Cookies stored on browser are sort of lookup table with key value pairs.

We can access cookies on server side using **req.cookies**.

##### [practice]
    - create a middleware and set a cookie of your name and send it to browser.
    - check cookie in your browser
    - access it on a request in the server.


#### sessions

A session is a chunk of data maintained at the server that maintains state between HTTP 
requests. HTTP is fundamentally a stateless protocol, sessions are used to give it 
statefulness.

Cookies are often used to facilitate sessions since it tells the server which client 
handled which session.

Sessions are stored in server side.There is no such storage limit on session .Sessions
 can hold multiple variables.Since they are not easily accessible hence are more secure
 than cookies.

By default Express requests are sequential and no request can be linked to each other. 
There is no way to know if this request comes from a client that already performed a 
request previously.

Users cannot be identified unless using some kind of mechanism that makes it possible.

That’s what sessions are. When implemented, every user of you website will be assigned a unique session, and this allows you to store the user state.

We’ll use the *express-session* module, which is maintained by the Express team.

In order to use express-session, we require it and place it as a middleware.

```js
var session = require('express-session');

// place as middlware after cookieParser()
app.use(session({
    secret: 'jhdvjhfbdjhvjhdfhjv',
    resave: false,
    saveUninitialized: true,
}));



```
Express session creates a session, stored in memory, on the server side for each unique request which contains a session id.

The session store defaults to a new MemoryStore instance.

It then takes session ID and creates a cookie in the browser named *connect.sid*. The
cookie defaults to :

```js
    {
        path: '/', 
        httpOnly: true, 
        secure: false, 
        maxAge: null 
    }
```

**secret** is used to sign the session ID cookie. It can be any random string.

**resave** forces the session to be saved back to the session store, even if the session was never modified during the request. It takes *boolean* as value. 

**saveUninitialized** forces a session that is "uninitialized" to be saved to the store.

Once a session is created, we can access the session using **req.session**.

We can also set values into the session using request object.

```js
// setting values to session
req.session.username = 'xyz'

// accessing a session
req.session.username // returns 'xyz'

```

#### [practice]
    - add express-session as middleware
    - set username into session 
    - try accessing session doing a seperate request

express-session uses MemoryStore as default memory which is very volitile.

Each server restart or killing a server erases sessions from memory store.

We use mongostore as persistent store for sessions. We use already connected mongodb instance to store sessions into a collection called *sessions*.

To instruct sessions to use mongo store, we require a npm package called connect-mongo to connect to mongoDb database and place a store key in sessions.

Make sure to require MongoStore after session, because it uses sessions to create store.

```js
const MongoStore = require('connect-mongo')(session);

app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
```

##### [practice]
    - use connect-mongo to store sessions to mongoDB database.
    - create a session
    - check for session on multiple requests and server restarts

### Simple Email, Password login

##### practice
    - create a user model with fields
        - name
        - email
        - password
    - Add a user registration page and save user details to database

#### hashing a password

##### mongoose middlewares

Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level.

The create() function fires save() hooks.

##### Pre save hooks
Pre middleware functions are executed one after another, when each middleware calls next.

```js
var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});
```
Whenever we have to save a user, we use Model.create() which triggers save() hooks.

We are going to hash the password in pre save() hooks because *pre save()* hook is triggered before the *save()* hook.

We are using bcrypt npm package's hashSync method to hash password. Bcrypt's hashSync takes 2 argument.
    - password to be hashed
    - salt factor or secret used to hash

```js
var bcrypt = require('bcrypt');
    bcrypt.hashSync(password, salt_factor);
```
The entire pre save hooks looks like:

```js
var userSchema = new Schema ({...});

userSchema.pre('save', function(next) {
    // check whether password is changed on not
    if(this.isModified('password')) {
        //hash and save it to same password field
        this.password = bcrypt.hashSync(this.password, salt_factor // 10);
        return next();
    }
    next();
})
```
If you use next(), the next() call does not stop the rest of the code in your middleware function from executing. Use the early return pattern to prevent the rest of your middleware function from running when you call next().

#### validate password

We can define methods on mongoose schema which can be used on returned documents from mongodb which follows that schema.

Methods are defined on schema and are used with document which follows that schema.

In order to validate password, we can define methods on userSchema and can be used to check passwords whenever a user logges in.

```js

userSchema.methods.verifyPasswod = function(password) {
    return bcrypt.compareSync(password, hashed_password // this.password) // returns true or false
}
```

We can use this method by invoking it on user returned from database which follws userSchema i.e. *user.verifyPassword*.

Somewhere in login routes:

```js
User.findOne({email: ""}, (err, user) => {
    // here user returned contains method defined on userSchema
    // we can run
    user.verfiyPassword()
    // it will check for verifyPassword on user schema
})
```

In the login routes, now we can verify a user credentials (email and password) to log a user in, if credentials match the one saved with database.

Steps are:
1. verify email
2. verify password
3. log user in

```js
router.post('/users/login', (req, res, next) => {
    // fetch email and password from form
    var { email, password } = req.body;
    User.findOne({email: email}, (err, user) => {
        // check error
        // return next with error, so next codes in line are not executed
        if(err) return next(err);
        // check wrong email
        if(!user) return next('Please enter valid email');
        // check password
        // user userSchema's verifyPassword method which applies on returned user
        if(!user.verifyPassword(password)) return next('Incorrect password');
        // if true, credentials are correct
        // log the user in by adding user's id  it to session
        req.session.userId = user.id;
    })
})
```

Since sessions are persisted across multiple requests, we can check session on each requests to verify whether a user is logged in or not.



