### Express-generator
express-generator is an npm package which generates an express application with some predefined middlewares, routes and scripts to get started.

In order to use generators, we install **express-generator** globally on our system using *npm install -g express-generator*

The folder structure is: 
    - bin 
    - www // contains createServer method to start server
    - public // for storing static assets
    - routes // handle routing here
    - views // templates are present here
    - app.js // core of our application
    - package.json // metadata of project

views are meant to store the templates which is rendered on webpage. We use templates like `pug` or `ejs` which has ability to embed javascipt code into it.

`pug` is used as default templating engine. We can override the default engine for templating.

**express --help** outputs usage information in express.

To create an express application type **express <options> <APP_NAME>**
```js
// creates a sample express application with ejs as view engine
express --ejs sample
```

##### practice 
create a sample application using express-generator with ejs as template engine.

### models
By convention, we put all the schema and model related information into a root folder called **models**.

For each resource, we add a file named on resources and create respective schema and models there itself.

For example, if we have user and article resources,

models
    - User.js
        - user schema and models
    - Article.js
        - article schema and models

Once we have defined Model, we export it so that we could use it outside the model file.

##### practice
create a user schema and model and export it.

### routing convention

For each action(like create, update, delete) on any resource, we define unique urls(routes) which are going to handle specific event.

For example, take user resources, we need to handle routes for
    - create a user // POST request on "/users"
    - list users // GET request on "/users"
    - get single user // GET request on "/users/:id"
    - update a user // PUT request on "/users/:id"
    - delete a user // DELETE request on "/users/:id"

It should not take routes like `/users/createUser` or `/users/listUser`

We usually seperate routing from our main app.js file because of enormous size of file(app.js).

We use routes folder for all our routing.

express's router module is used to handle routing in routes folder.

```js
var express = require('express');
// use router module from express
var router = express.Router();

// handle all resource specific routes
router.get('/', (req, res) => {})
router.post('/', (req, res) => {})

// export router
module.exports = router;
``` 

For each resource, we create a file based on resource name and handle all routes related to that resource there itself.

For example, if we have routes related to users and blogs
file structure is:

routes
    - users.js // handle all user related routes here
    - blog.js // handle all blog related route here

##### practice
Inside user routes, create routes for
    - create a user // POST request on "/users" route
    - list all users // GET request on "/users" route
    - get single user // GET request on "/users/:id"

## CRUD

CRUD operations in mongoose are very similar to mongodb. It signifies `CREATE`, `READ`, `UPDATE`, `DELETE` operation on mongodb database using `mongoose` as a mapper or ODM.

We perform all the operation on mondodb using the model we defined earlier using mongoose. We created schema which holds the structure of data(fields and their types).
Using the schema, we created models which is responsible for interacting with mongodb database.

### 1. CREATE or INSERT
We use `model.create` or create a model using newconstructor, that is `new Model({})`.
Suppose we have a `User` model, we can create a new user using

```js
// Using model create
// Model.create takes user Object to create a first argument, callback as second 
var newUser = {name: "asdf", email: "asdf@gmail.com", age: "23"};
// using User model
User.create(newUser, (err, user) => {})
// It returns either error or created user as callback.

// OR

//using new Model and save function
var user = new User() // creates instance of model using new and takes user object
user.name = "asdf";
user.email: "asdf@gmail.com",
user.age = "23"
// save the user
user.save((err, user) => {}) // save method takes the callback
```

##### practice
Create a user resource
    1. generate User model
    2. add a POST request on "/users" in user router.
    3. Send user information from postman
    4. Console user in req.body
    5. Save user to database
    6. return created user in response 

### 2. Query Document

Querying database again uses models to interact to database.
We use `Model.find()`, `Model.findOne()`, `Model.findById()` methods to query documents from a database.
All Of them takes query as the first argument and returns callback as second.
```js
// query can be object or simply Id's in case of findById
Model.find(query, callback)
```
  - Model.find returns all the document which matches query params.
  - Simply `Model.find()` without any parameters returns all documents.
  ```js
  Model.find() // returns all document as an array of objects// [{}, {}, {}] 
  ``` 
  - Model.findOne returns first document which matches query params.
  ```js
  // Returns the first match always
  Model.findOne({name: /sam/}, (err, result) => {});
  //  It will return first document whose name matches sam. 
  ```
  - `Model.findById(id, callback)` takes the Id field as first argument and callback received as second.

##### practice
1. Get all users
    - create a route in user router, GET request on "/users"
    - fetch all users from database
    - return user list in response.

2. Get a single user
    - create a GET request on "/users/:id"
    - get id using req.params.id
    - find single user from database
    - return user in response

### Views

Views represents templates for rendering webpages. There are a lot of templating engine used in express to display content on webpages.

Using these templates, we can render dynamic javascript arrays and conditional as well. we can use some javascript function in these templates.

By default, jade/pug is used with express.

To change templates, we pass certain flags while creating express application using generators.

for example, **express --ejs sample** // we provide --ejs flag to indicate that we are going to use ejs template with express application.

Ejs templates supports HTML formats along with certain javscript functionalities like forEach function and conditionals.

To use a specific template, we set view engine in app.js and provide a path where we are going to store all templates.

```js
// view engine setup

app.set('views', path.join(__dirname, 'views')); // set views directory for all templates
app.set('view engine', 'ejs'); // tell express to use ejs as templating engine

```

Once views directory and view engine is placed, we can call any templating from any routes by using **res.render(template name)**.

```js
res.render('about') // call about.ejs file from views directory
```

##### practice
inside index route 
    - add GET request on "/contact" and render contact.ejs with a contact form

#### Add dynamic content to template
In order to pass a variable to template, we pass an object as second argument to **res.render** method.

```js
// pass variable as second argument to res.render
res.render('index', {name: "asdf"})

// We can acces the name variable in index.ejs templates like
<h1><%= name %></h1>

// we can also pass multiple varibale as multiple key value pairs
res.render('index', {name: "xyz", email: "qwerty@gmail.com"})

```

We can pass an entire array in a variable to templates.

```js
var allNames = ['name1', 'name2', 'name3']
res.render('index', {names: allNames});

// We can access array of elements using forEach method.
// inside index.ejs template
<% names.forEach(function(name) { %>
    <h2><%= name %></h2>
<% }) %> 

```
##### practice

1. Display List of users
    - handle GET request on "/users"
    - fetch all users from database
    - create users.ejs in views
    - render users.ejs and pass list of users from database as second argument as object

2. Display single user
    - handle GET request on "/users/:id"
    - fetch user from database using id received from params
    - render singleUser.ejs with single user information.
 



