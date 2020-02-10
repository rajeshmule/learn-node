### NPM
NPM is a set of publicly available, reusable components, available through easy installation via an online repository, with version and dependency management.

A full list of packaged modules can be found on the npm website, or accessed using the npm CLI tool that automatically gets installed with Node.js. The module ecosystem is open to all, and anyone can publish their own module that will be listed in the npm repository.

### package.json(5 min)
Package.json is a plain **JSON** text file which contains all metadata information about Node JS Project or application.

Every Node JS Package or Module should have this file at root directory to describe its metadata in plain JSON Object format.

package.json file contains a number of different elements or directives. It uses these elements to tell NPM “How to handle the module or package”.

#### Mandatory Elements(5 min)
package.json file contains two mandatory elements;

1.name - Name of application(should be unique while publishing)
2. version - version of application

Example are: 
```js
{
  "name": "sample",
  "version": "1.0.0"
}
```

There are several other elements defined like description, keywords, repository, dependencies,scripts etc...

#### Semantic Versioning(10 min)

To keep the JavaScript ecosystem healthy, reliable, and secure, NPM packages follows the semantic versioning spec. 

Any npm package follows **X.Y.Z** versioning like *1.0.7* where
X -> Major version
Y -> Minor version
Z -> patch version

##### Patch updates
These are bug fixes in package and are backward compatible.
**~** character is used to update package to latest patch update.
```js
{
    "express": "~4.10.0" -> update upto latest patch if available ie **"4.10.7"**
}
```

##### Minor update
These are addition of few new features in packages. They are also backward compatible.

**^** is used to symbolize minor updates if available.

```js
{
    "express": "^4.6.2"
}
```

##### Major update
These are entirely changing the package specs that is brand new application which is not compatible with previous versions.

#### Create package.json file(10 min)
We can create package.json file manually or by running script **npm init** from root of project directory.

It prompts you to answer some babic metadata of project, just hit enter to continue.

You can avoid all steps by typing **npm init --yes** or **npm init -y** in short.It will create a package.json file without asking about metadata information.


To download an npm package, there are 2 ways

1. Add package to package.json in either dependencies or dev-dependencies element and run **npm install** or npm i in short from terminal.

2. run **npm install <package name> --save** from terminal. It installs the package and saves it to package.json in dependencies section file. For saving it as dev-dependency use *--save-dev* instead of *--save*.

There are 2 kinds of dependencies, one which is required throughout the application which is saved in dependency section. Other is dependencies which are used just for development of application and are kept in dev-dependencies.

## Express(10 min)
Express is simple, minimalist and unopinionated node framework i.e an abstraction
layer build on top of node. It follows MVC convention and has all the functionalities
required to create a full stack application.

  - Models for structuring data and can be integrated with SQL and NoSQL databases. 
  - Views for rendering templates and different methods for displaying HTML pages.
  - Controllers and routes for handling multiple route requests, processing them and
  displaying appropriate web page.

It breaks conventional node's request handling into multiple middlewares and routes.
Each middleware perform a specifiic task and passes the request to next middleware in
row until a response is sent.

It makes routing easy and clean to handle.

It also adds several abstractions for returning a response. In node, we have 
`res.write` followed by `res.end`, whereas in Express we have `res.send`, `res.render`, `res.sendFile`, `res.json` and `res.redirect`. They all have different use cases.

### Basic server in express(10 min)
```js 
// Require express
var express = require('express');
// mount express application on app variable
var app = express();
// Define a port
var port = process.env.PORT || 4000;

// Add listener for server to listen on a port
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
```

##### Practice (5 min)
Create a basic express server with single route (a GET request on '/' route)

### Middleware(10 min)

Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

A web server can be seen as a function that takes in a request and outputs a response. Middlewares are functions executed in the middle after the incoming request then produces an output which could be the final output passed or could be used by the next middleware until the cycle is completed, meaning we can have more than one middleware and they will execute in the order they are declared. 

Middleware functions can perform the following tasks:

  - Execute any code.
  - Make changes to the request and the response objects.
  - End the request-response cycle.
  - Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

#### Application level middleware(5 min)

These middleware takes route as their first argument which is optional. Second argument is a callback function which receives request, response and next as their arguments.

Example 1 is:
```js
// it applies only on '/' route.
app.use('/', (req, res, next) => {
    // execute code here
    next();
})
``` 
Example 2:
```js
// since no route as first argument, it applies on all routes.
app.use((req, res, next) => {
    // execute code here
})
```

*Example 1* takes a route as first argument which means that this middleware will only apply when a request on that specific route is made. *Example 2* middleware can apply on all routes. 

##### practice(5 min)
A simple middleware that prints current date and passes execution to next middleware in queue.
```js
...
app.use((req, res, next) => {
  console.log(new Date().toDateString())
  next();
})
...
```

#### Built-in middleware(5 min)
These middlewares are built into express application. You need to implement them as a app-level middleware in express.

##### 1. express.json()
This middleware is used to **parse json data** coming from request and make it available in *req.body*.

In order to use them, we place it as application level middleware.

```js
app.use(express.json());
```

##### practice(5 min)
Add express.json middleware and send json data from postman on '/' route.
console.log(req.body) to see all json data in console.

##### 2. express.urlencoded()

This middleware is used to parse **x-www-form-urlencoded** data sent from request. It works very similar to express.json. It takes *{extended: false}* as only argument. In order to parse nested form data, we make *{extended: true}* 

```js
app.use(express.urlencoded{extended: false});
```

##### practice(5 min)
Add express.urlencoded as middleware and send form data from postman. Access it using req.body

###### 3. express.static(5 min)
This middleware provides a public directory to place all static assets like `css`, `images` as well as `client side javascript`. All the static contents put inside public directory are accessible  througout the application and we dont have to handle them on seperate routes.

```js
var path = require('path');
app.use(express.static(path.join(__dirname, "public")));
```
By convention, we create different folders for different static assets.
Folder structure is:

public
  - css
    -- all css file resides here
  - images
    -- all images here
  - javascript
    -- all js here

##### practice(5 min)
1. Add images in public to see whether it is accessible or not.
2. Add css in public and check whether accessible or not.

#### Third party middleware

##### 1.Cookie-parser(5 min)
Cookie-parser is used to create cookie and send it with response to clients.

We use it by requiring it and placing it as application level middleware.

```js
// require cookie-parser at top
var cookieParser = require('cookie-parser');
app.use(cookieParser());
```

Once we have cookie-parser as middleware, now we can send cookie to response.
We can create a cookie on response object. It takes 2 argument ie first is cookie name and second is cookie value.

```js
res.cookie("cookieName", "randomname", { maxAge: 900000 } );
``` 

We can also fetch cookies from requests using **req.cookies**.
```js
req.cookies
```

##### practice(5 min)
1. Add cookie-parser middleware and set a cookie.
2. Fetch all cookies from request in next middleware.

##### 2. morgan(5 min)

Morgan is used as logger middleware. It logs some information about each request made to the server.
```js
var logger = require('morgan');
app.use(logger('dev'))
```

#### error handling middleware(10 min)

In order to handle error in express application, we use error handler middleware.
It takes four argument
  1. error
  2. request
  3. response
  4. next function

In order to execute error handler middleware in any route or middleware, we call next with error argument.

For example take a middleware, which returns next without any arguments if succedds and 
next with an argument if error occurs.

```js
app.use((req, res, next) => {
  fs.readFile(path to file, (err, content) => {
    if(err) return next(err);
    next()
  })
})

```

Error handler middleware is always placed after handling the routes in express application.

```js
app.use((error, req, res, next) => {
  res.status = 500;
  res.send(error);
})
```

##### practice (5 min)
1. create a error handler middleware after handling all the routes.
2. create a middleware and call next with an argument to check whether  it is handle by error handler middleware or not ?

### Basic routes(10 min)
Routes are middleware that are responsible for handling the url request received by server. Any request made to server includes a HTTP method and the path at which request is made.

Routes get the HTTP method and path and matches it to the routes defined on server. When a route match is found, it processess the request and sends the response otherwise error hnadler throws a `no route found error`.

Valid HTTP method could be one of `GET`, `POST`, `PUT`, `DELETE` etc..

Path corresponds to the path part of the url.

Router.method takes 2 arguments.
  1. path of the requested url
  2. request handler i.e callback function
  ```js
  // here get is the method, `/admin` is the path and (req, res) part is callback function
  app.get('/admin', (req, res) => {
    // Send the response here
  })
  ```

We could define 2 routes on same path but with different method. They are treated as different routes. We will use these conventions very often.

```js
app.get('/login', callback => {});
app.post('/login', callback => {});

```
  #### req.params(5 min)

In order to fetch ids or username from routes like `/users/1234` or `/users/sam`, we use params property in request object.

```js
// Our route looks like
app.get('/users/:id', (req, res) => {
  var userId = req.params.id // 1234
  // Send response here
});

//OR

app.get('/users/:username', (req, res) => {
  var username = req.params.username // sam
  // send response here
})
```

##### practice(5 min)
1. Add a GET request on '/' route and render 'index.html' file.
2. Add a GET request on '/new' route and render new.html with a html form. 



