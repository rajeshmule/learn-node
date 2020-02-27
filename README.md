# Learn Node.js

## Day-1

### What is node? (10 min)

Node.js is an open-source, cross-platform, runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript.

Node.js is a packaged compilation of Google’s V8 JavaScript engine, the libuv platform abstraction layer, and a core library, which is itself primarily written in JavaScript.

There are other independent libraries also used by nodeJS apart from few listed above.

The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS).

As such, the environment omits browser-specific JavaScript APIs and adds support for more traditional OS APIs including HTTP and file system libraries.

### Computer Execution (5 min)

Computer does not understands higher languages like html, css or js. It only understands binary ie 1 and 0. There are tools available which converts those languages into binary.

1. Compilers

   - turns source code into executables(machine code)

2. Transpilers

   - turns source code into source code of other type
   - like coffeescript to javascript or scss /sass to css

3. Interpreters(compile+execute)
   - take source code and execute it by taking realtime intermediate steps like compiling it.

### v8 (5 min)

v8 engine is the runtime environment for nodejs. Node build on top of chrome v8 javascript engine.

v8 is single threaded(performs one task at a time) and used for core javascript computation.

Call Stack is part of v8 which is responsible for executing functions in javascript.We will discuss callstack later.

v8 engine acts as an interpreter in our system.

Examples of javscript engines 1. JavascriptCore(safari) 2. Spidermonkey(firefox)

3.  chakra(IEx)

    ### Questions (5min)

    1. what is node?
    2. differentiate compiler, transpiler and interpreter.
    3. explain v8
    4. Any 2 other javascript engines ?

### REPL(Read Eval Print Loop) (5 min)

- inteactive jS runtime which execs JS code on go
- like console in browsers
- starts event loop in background and waits for code snippets
- for running REPL type **node** in TERMINAL

```js
  $ node
```

##### Steps are

- reads code from terminal
- evaluates them
- prints the result
- starts the same loop again ie waits for code snippet

##### Practice(5 min)

1.open REPL
2.execute some javascript code(2+2)

##### Questions(5 min)

Explain steps in REPL?

### A Script processor(10 min)

- Initialises process called event loop in background
- Reads in file you specify
- Reads all deps in file and all deps of those file
- Executes sync tasks as soon as encountered in those files.
- Processes todo list of async task(Non-blocking) by repeating event loop until it has nothing to do.

#### example for running a node script

```js
$ node index.js
```

##### Practice(5 min)

Write a script(index.js) and run it using **node index.js**

### Require(CommonJS pattern)(5 min)

Require is a global in nodejs used to fetch extenal resoures into a file.

Globals can be used directly in nodejs without importing or requiring it.

Example is

```js
var fs = require("fs");
```

### Core node modules(5min)

These modules are available in the projects, you simply have to require them in order to use them in your project. For example Filesystem aka fs module is inhereted in every node project.

In order to use them:

```js
var fs = require("fs");
```

##### Questions(5 min)

1. Explain globals ?
2. Define fs module ?

##### Practice(10 min)

1. require fs in a file and use fs.readFile to read content of a file.

```js
fs.readFile(filepath, (err, file) => {});
```

### Buffer(5 min)

Node provides Buffer class which provides instances to store raw data similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.

It stores data in hexadecimal format.

Create a new buffer like

```js
var buf = new Buffer("Simply Easy Learning");
```

Define length of a buffer. It can only store characters upto the length.

```js
var newBuff = new Buffer(20);
```

Read content from a buffer.

```js
buf.toString();
```

##### practice(10 min)

1. open REPL
2. create new buffer
3. Define length of a buffer
4. read content from a buffer

##### Question

what is buffer ?

### Blocking vs Non-blocking(10 min)

Codes that block the excution of callstack in javascript are blocking codes.

All Sync function are blocking in nature. They block the execution until it finishes.

All Sync function in node modules append Sync to execute in synchronously.

```js
fs.readFileSync();
```

All Async function are non-blocking in nature. They continue in background and allow callstack to execute next function in line.

```js
fs.readFile();
```

##### Questions

Explain blocking and non-blocking codes ?

##### Practice(5 min)

1. Run sync code from fs in a file.
2. Run async code in another file.

### HTTP Protocol(10 min)

HTTP is connectionless/stateless text based req/res protocol. Clients (web browsers) send requests to web servers for web elements such as web pages and images. After the request is serviced by a server, the connection between client and server across the internet is disconnected.

- HTTP is the underlying protocol used by the World Wide Web
  - HTTP (Hypertext Transfer Protocol) like any other Application Layer protocol runs over a Transport Layer protocol.
  - A new connection must be made for each request.

### parts of http request

#### A. URLs

Request URLs consists of multiple parts.
Example is _https://blog.altcampus.io:80/students/register?name=suraj&gender=male_

- **https** - protocol
- **blog** - subdomain
- **altcampus.io** - domain or website name
- **80** - port
- **students/register** - path
- **?** - start of query
- **name=suraj** - query params(always key value pair)
- **&** query seperator

##### practice(10 min)

Use **URL** module to parse url informaton.

```js
var url = require("url");
url.parse(
  "https://blog.altcampus.io:80/students/register?name=suraj&gender=male",
  true
);
```

#### B. Headers

HTTP headers allow the client and the server to pass additional information with the request or the response. An HTTP header consists of its case-sensitive name followed by a colon ' : ', then by its value (without line breaks).

There are 4 kinds of headers

1. General header

- Headers applying to both requests and responses but with no relation to the data eventually transmitted in the body.
- Examples are:
  - Request URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
  - Request Method: GET
  - Remote Address: 13.35.189.28:443

2. Request header

- Headers containing more information about the resource to be fetched or about the client itself.
- Examples are:
  - scheme: https
  - accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8
  - cookie: \_ga=GA1.2.1198025837.1533318161; dwf_sg_task_completion=False; dwf_contrib_beta=False; \_gid=GA1.2.283126628.1551861552
  - referer: https://www.google.com/
  - user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36

3. Response header

- Headers with additional information about the response, like its location or about the server itself (name and version etc.).
- Examples are:
  - cache-control: s-maxage=300, public, max-age=0
  - Status Code: 200
  - content-language: en-US
  - content-type: text/html; charset=utf-8
  - date: Wed, 06 Mar 2019 10:04:49 GMT

4. Entity header

- Headers containing more information about the body of the entity, like its content length or its MIME-type.
- Examples are:

  - content-length: 344
  - mime-type: application/json

#### C. Body(optional)

This is an optional field which is only sent when user is trying to submit any form data to the server.

##### Practice(5 min)

Do a request on google.com and view headers inside developer's network tab by clicking on a specific request.

### module.exports(5 min)

Node’s module system makes use of a global function called require and a global object called module.exports. The two make for a straightforward module system.

Nodes module system creates a dependency tree, which tells node which file are needed to run the application.

Module.exports is used to export functions, objects, variables to other files which will use require global in order to use them.

## Day-2

### http's createServer(15 min)

Node's inbuilt http or https module is used to create a server. HTTP module's createServer method is used to create a server.

It receives request and response objects as callbacks which are responsible for acting on a specific request received. Based on a request, a response is send back to the caller and the cycle terminates after ending the response using response.end().

createServer method takes request and response as callbacks. Request can be aliased as _req_ and response as _res_. This callback (req, res) is referred to as _request handler functions_.

```js
var http = require("http");

http.createServer((request, response) => {
  // Do the handling part here..
});

// OR

http.createServer((req, res) => {
  // handling and sending response here..
});
```

At last, we listen for requests on a specific port and host so we have to define a listener method at the end of the createServer method. Hostname is optional and defaults to `localhost`. Listen method takes an optional 3rd parameter as callback.

```js
var port = 3000;
var hostname = "localhost" || "127.0.0.1";
http
  .createServer((req, res) => {
    // handle response here ..
  })
  .listen(port, hostname);
```

#### practice (10 min)

create a basic node server using http module's createServer method and send hello world to response.

### Request Object(15 min)

Request object has information about incoming requests. Requests are readable streams which contains information about protocols, request methods, urls at which request is coming, headers included with request. Once we know the specifications of the request made, response can be send accordingly.

Few of the request properties are...

1. Headers

- Headers are objects which has information about host, user-agent, cookie, accept-language, accept content-type etc...
- Headers can be accessed using `req.headers`
- returned object is:

```js
{ host: '',
connection: '',
purpose: '',
'upgrade-insecure-requests': '1',
'user-agent': '',
accept: '',
'accept-encoding': '',
'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
cookie: '' }
```

#### practice

Get headers from request after starting a server.

2. url

- url provides the path where the request was made. It returns query string along with path for requested urls.
- It can be accessed using `req.url`. It returns a string containing path and query string if available like `/users/register?name=asdf`

#### Practice

Get url from request object in a server.

3. Method

- `req.method` returns the http verb or method used for making request. It can be one of `GET`, `POST`, `PUT`, `DELETE`.

#### Practice

Get request url from request object in a server.

### HTTP Request Methods(5 min)

There are multiple methods used to do request over HTTP. 1. GET - fetch information 2. POST - Insert data for first time 3. PUT - Update data(replace previous record) 4. DELETE - Delete data 5. PATCH - Update a part of it

##### Practice(5 min)

Do request on server using **different HTTP methods** using **Postman** an check the request method on each one of them.

### Response Object(15 min)

Response is a writable stream which means we can write to response object when returning a specific response. We can set status code, specify a content-type and write responses. One can modify responses depending on the content-type provided.
For html content, set Content-Type as `text/html` and write response as `res.write(<h1>hello world!</h1>)`.

```js
http.createServer((req, res) => {
  // Add Status Code
  res.statusCode = 200;
  // Set content-type
  res.setHeader("Content-Type", "text/plain");
  // Set multiple headers
  res.writeHead(200, { "Content-Type": "text/html" });
  // Write to a response
  res.write("hello world!");
});
```

##### practice

Add statusCode and headers to response in Server

### handling request on multiple routes(10 min)

In order to handle multiple requests on our server, we need to extract the **url** or **pathname** from requested url.

Once we have urls, we can run multiple if condition to check for a specific url and return respective content using res.write().

```js
http.createServer((req, res) => {
  if (req.url === "/") {
    // send response
  } else if (req.url === "/about") {
    // send another response
  } else {
    // Send error message
  }
});
```

##### practice

1. handle request on '/' and send 'welcome to homepage' in response.
2. handle request on '/about' and send response 'this is all about NodeJS'.

### handling multiple http methods on same route(10 min)

There are different HTTP methods used to do request on same route. Same route can be used to handle different requests usnig different HTTP methods.

for example, we can handle GET on '/' as well as a POST request on '/'. Both these requests will be treated as different request.

```js
http.createServer((req, res) => {
  if (req.method === "GET") {
    // handle get request
  } else if (req.method === "POST") {
    // handle post request
  }
});
```

### Fetch query params from request(10 min)

In order to fetch query params, we need to parse the entire url received from request using **req.url** using node's inbuilt url module.

Suppose url is _http:localhost:3000?name=test_'

To fetch query params from url, we need to extract the url first from `req.url` and then parse the url using URL module's parse method.

```js
http.createServer(function(req, res) => {
    // Extract url from request object
    var reqUrl = req.url;
    // Parse url using parse method from url
    url.parse(reqUrl, true)
    // It returns an object with all url parts in key value pair like protocol, hostname, port, query etc..
})
```

### Fs(5 min)

Normal filesystem operation like readFile or writeFile reads all the content into memory and then processess it.

It can downgrade performance as memory consumption increases sharply.

When a large file(size in GBs) is being read, all contents are temporarily stored in memory, which reduces memory availability for other operations and hence degrades performance.

Example is:

```js
fs.readFile(path to file, function(err, data) => {
    // process data here
})
```

#### Practice(5 min)

use readFile method from fs to read a file.

### Streams(10 min)

Streams breaks the larger files in smaller chunks and makes it available for processing. These smaller chunks are stored in memory as Buffers. These chunks consume a smaller section of memory at a time.

Streams have a pipe method where received chunks could be passed to next function using pipe.

```js
http.createServer((req, res) => {
  // Here, creteReadStraem reads file into smaller chunks and the chunks are
  // passed to response when availbale for processing.
  fs.createReadStream(file to read).pipe(res);
})
```

#### Practice(5 min)

Create a http server and use createReadStream to read a file and pipe the chunk into response.

## Day-3

### Absolute and relative path(10 min)

Absolute path provides path of a file or directory from the root of the system.

**dirname is used to get absolute path of directory in which it is called.
**filename is used to get absolute path of file.

##### practice

console.log(**dirname);
console.log(**filename)

Relative path provides path of a file from where it is called.

Example :
test(folder) - index.js - app.js

If app.js is required from index.js

```js
var app = require("./app.js");
```

#### path module(10 min)

path is a core node module.

We use join method from path module to join file path to a directory.

```js
var path = require("path");
var indexPath = path.join(__dirname, "index.js");
```

### EventEmitter(15 min)

EventEmitter class is defined on _events_ core node module. This forms the core of event driven architecture where certain kind of objects called emitters periodically emit events that cause listener objects to be called.

Examples are 1. http's createServer method 2. request object received as createServer callback 3. fs.createReadStream method

All methods which belong to eventEmitter class emit some named events.

Examples are

1.  createServer method emits **request** and **error** events. 2. request emits **data** and **end** events

In order to listen to those events, we use listeners methods defined on those events using _".on"_ event.

It takes named event as first argument and callback function as second.

For example

```js
var server = http.createServer();
// request is named event emitted by createServer
server.on("request", function(req, res) {
  // Handle response here
});
```

**createReadStream** method is also an eventEmitter which emits _data_ event in order to capture data and _end_ event when entire file is read.

Examples are:

```js
var store = fs.createReadStream(path to file)

store.on('data', (chunk) => {
  res.write(chunk)
});
// Once all data is received, end event fires
store.on('end', () => {
  res.end()
})
```

#### Practice(5 min)

Use createReadStream method to read a file and send data to response one chunk at a time.

Streams are recommended and widely used in node application as it differs from normal file system operation execution. By default, request and response objects in createServer method(http) are readable and writable streams respectively.

We can read from requests. It uses streams for reading contents.In the same way, we can write to responses using streams as default.

### Capturing data from request body(15 min)

All the request information along with optional data is present in _request_ object received as callback from createServer method.

Request Object also belongs to eventEmitter class and emits event.

In order to capture data coming from optional body, we listen for **data** and **end** event on request object.

Data received during _data_ event are broken into smaller chunks and received as callback function with chunk of information. We store all chunks.

```js
var store = "";
req.on("data", chunk => {
  store += chunk.toString();
});
```

When all data is received _end_ event fires with a callback function with no arguments to mark data completion.

```js
req.on("end", () => {
  // Send response here
});
```

After the end event fires, we can send response.

The entire operation may look like:

```js
var http = require("http");
http.createServer(function(req, res) {
  var store = "";
  req.on("data", chunk => {
    store += chunk.toString();
  });

  req.on("end", () => {
    // parse store data
    // Send a response
  });
});
```

If data is send along with request, here on server we captured data and saved into store variable.

If no data is send, _end_ event fires automatically and store variable is empty string.

Data can be send in one of these 2 formats 1. Form data(using html forms) 2. JSON data

Now we need to parse received data stored in store varibale.

### Parse JSON data(10 min)

**JSON.parse** is used to parse json data.
Example:

```js
JSON.parse(store);
// It returns data in proper object format.
```

##### practice(5 min)

send json data from postman and pasre it into the server.

### Parse form data(10 min)

Form data is often received in query string format.
Example is _"name=abc&email=abc@gmail.com&age=24"_

In order to parse form data, we use **querystring** module from core node.

```js
var querystring = require("querystring");
querystring.parse(store); // returns object
```

##### practice

send form data from postman and parse it into the server.

### display HTML file in response(10 min)

When a HTML page is rendered or sent during the response, then for all associated resource linked into html like css, images, browser specific javascript, a seperate request is made to our server by the browser.
We have to handle all associated requests and send proper response for rendering associated css and images.

for example, if html has associated css and images, for all images and css, we have to handle them seperately on different routes.

```js
 // read html file and send data
http.createServer((req, res) => {
    if(req.url === '/') {
        // set response headers
        res.setHeader('Content-Type', 'text/html');
        // use streams to read file
        fs.createReadStream(path to file).pipe(res);
    }
    // for associated css
    if(req.url.indexOf('css')) {
        res.setHeader('Content-Type', 'text/css');
        // send response
        fs.createReadStream(path to css file).pipe(res);
    }
    // Similarily handle images
})
```

#### practice(10 min)

Render HTML file in response using http's createServer method with associated css and images.

## day-4

### NPM

NPM is a set of publicly available, reusable components, available through easy installation via an online repository, with version and dependency management.

A full list of packaged modules can be found on the npm website, or accessed using the npm CLI tool that automatically gets installed with Node.js. The module ecosystem is open to all, and anyone can publish their own module that will be listed in the npm repository.

#### package.json(5 min)

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

Any npm package follows **X.Y.Z** versioning like _1.0.7_ where
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

2. run **npm install <package name> --save** from terminal. It installs the package and saves it to package.json in dependencies section file. For saving it as dev-dependency use _--save-dev_ instead of _--save_.

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
var express = require("express");
// mount express application on app variable
var app = express();
// Define a port
var port = process.env.PORT || 4000;

// Add listener for server to listen on a port
app.listen(port, () => {
  console.log("Server listening on port " + port);
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
app.use("/", (req, res, next) => {
  // execute code here
  next();
});
```

Example 2:

```js
// since no route as first argument, it applies on all routes.
app.use((req, res, next) => {
  // execute code here
});
```

_Example 1_ takes a route as first argument which means that this middleware will only apply when a request on that specific route is made. _Example 2_ middleware can apply on all routes.

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

This middleware is used to **parse json data** coming from request and make it available in _req.body_.

In order to use them, we place it as application level middleware.

```js
app.use(express.json());
```

##### practice(5 min)

Add express.json middleware and send json data from postman on '/' route.
console.log(req.body) to see all json data in console.

##### 2. express.urlencoded()

This middleware is used to parse **x-www-form-urlencoded** data sent from request. It works very similar to express.json. It takes _{extended: false}_ as only argument. In order to parse nested form data, we make _{extended: true}_

```js
app.use(express.urlencoded{extended: false});
```

##### practice(5 min)

Add express.urlencoded as middleware and send form data from postman. Access it using req.body

###### 3. express.static(5 min)

This middleware provides a public directory to place all static assets like `css`, `images` as well as `client side javascript`. All the static contents put inside public directory are accessible througout the application and we dont have to handle them on seperate routes.

```js
var path = require("path");
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
var cookieParser = require("cookie-parser");
app.use(cookieParser());
```

Once we have cookie-parser as middleware, now we can send cookie to response.
We can create a cookie on response object. It takes 2 argument ie first is cookie name and second is cookie value.

```js
res.cookie("cookieName", "randomname", { maxAge: 900000 });
```

We can also fetch cookies from requests using **req.cookies**.

```js
req.cookies;
```

##### practice(5 min)

1. Add cookie-parser middleware and set a cookie.
2. Fetch all cookies from request in next middleware.

##### 2. morgan(5 min)

Morgan is used as logger middleware. It logs some information about each request made to the server.

```js
var logger = require("morgan");
app.use(logger("dev"));
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
});
```

##### practice (5 min)

1. create a error handler middleware after handling all the routes.
2. create a middleware and call next with an argument to check whether it is handle by error handler middleware or not ?

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
app.get("/admin", (req, res) => {
  // Send the response here
});
```

We could define 2 routes on same path but with different method. They are treated as different routes. We will use these conventions very often.

```js
app.get("/login", callback => {});
app.post("/login", callback => {});
```

#### req.params(5 min)

In order to fetch ids or username from routes like `/users/1234` or `/users/sam`, we use params property in request object.

```js
// Our route looks like
app.get("/users/:id", (req, res) => {
  var userId = req.params.id; // 1234
  // Send response here
});

//OR

app.get("/users/:username", (req, res) => {
  var username = req.params.username; // sam
  // send response here
});
```

##### practice(5 min)

1. Add a GET request on '/' route and render 'index.html' file.
2. Add a GET request on '/new' route and render new.html with a html form.

# Day 5

## Mongoose(5 Min)

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Schema

It defines the structure of data and creates an schema object to be saved to the database.

### Datatypes(5 min)

DataTypes defines the type of fields which are present for schema creation.

The following are few valid SchemaTypes in mongoose which are widely used.

1. String - any utf8 supported string
2. Number - for all numeric values
3. Date - suports date type
4. Boolean - true or false
5. ObjectId - stores unique \_id of other document(Schema.types.ObjectId)
6. Array - store an array of documents

#### Creating schema(10 min)

We will be using mongoose to create a schema. Schema is a class defined on mongoose.

Steps are

1. Require mongoose
2. use mongoose to create a new Schema object.
3. Add fields to the schema object using key, value pairs.

```js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // add fields here
});
```

#### practice(5 min)

Create a simple schema using mongoose.

### SchemaType Options(5 min)

You can declare a schema type using the type directly, or an object with a type property and other validations properties.

```js
var schema1 = new Schema({
  test: String // `test` is a path of type String
});

var schema2 = new Schema({
  // The `test` object contains the "SchemaType options"
  test: { type: String } // `test` is a path of type string
});
```

##### practice(5 min)

create a user schema with following fields and type
1.name -> string
2.email -> string
3.age -> number

In addition to the type property, you can specify additional properties for a path.
Properties could be `uppercase`, `lowercase`, `trim`, `default` etc

```js
var schema2 = new Schema({
  test: {
    type: String,
    trim: true // Always trims `test` for white space
  }
});
```

##### practice (2 min)

update user schema to make email lowercase and default age to be 0.

## Validation(10 min)

Validation is defined in the SchemaType.

Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.

Validation is asynchronously recursive, when you call `Model.save`, sub-document validation is executed as well. If an error occurs, your Model.save callback receives it.

Validators are not run on undefined values. The only exception is the required validator.

There are certain options which apply for all schema types, and some that apply for specific schema types.

1. All Schema Types

- required: boolean or function, if true adds a required validator for this property
- default: Any or function, sets a default value for the path.

2. String Type

- lowercase: boolean, always call .toLowerCase() on the value
- uppercase: boolean, always call .toUpperCase() on the value
- trim: boolean, always call .trim() on the value
- match: RegExp, creates a validator that checks if the value matches the given regular expression
- enum: Array, creates a validator that checks if the value is in the given array.
- minlength: Number, creates a validator that checks if the value length is not less than the given number
- maxlength: Number, creates a validator that checks if the value length is not greater than the given number

3. Number Type
   - min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.

- max: Number, creates a validator that checks if the value is less than or equal to the given maximum.

4. Date Type

- min: Date
- max: Date

```js
var userSchema = new Schema({
  name: {
    type: String,
    // Required validator in place
    required: true
  },
  age: {
    type: Number,
    // Max and min validators on Number type
    min: 18,
    max: 75
  },
  email: {
    type: String,
    minLength: 5,
    match: /@/
  }
});
```

#### The unique Option is Not a Validator(5 min)

A common gotcha for beginners is that the unique option for schemas is not a validator. It's a convenient helper for building MongoDB unique indexes.

```js
var userSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});
```

##### practice(5 min)

Update user schema

1. contains password field with minimum 5 characters
2. add createdAt field of type date and default it to current date.

#### Indexes(5 min)

You can also define MongoDB indexes using schema type options.

- index: boolean, whether to define an index on this property.
- unique: boolean, whether to define a unique index on this property.

```js
var newSchema = new Schema({
// Define index on username
  username: {
    type: String,
    index: true // creates index on username
  }
  // Defines unique index on email
  email: {
    type: String,
    unique: true
  }
})

```

##### practice (5 min)

add unique indexes to emails.

#### ObjectIds(5 min)

To specify a type of ObjectId, use Schema.Types.ObjectId in your declaration.
ObjectIds are used to associate 2 different models.

```js
ar mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Car = new Schema({ driver: ObjectId });
```

##### practice(5 min)

Add address Schema with fields

1. village -> String
2. city -> String
3. state -> String
4. pin -> number
5. user -> ObjectId of User

#### practice(2 min)

Update address schema to contain required validators for state and pin field.

#### Arrays(5 min)

We can also store array of values in fields defined in a Schema.
For array of strings or numbers, we wrap entire type in brackets.

```js
var playerSchema = new Schema({
  tags: [String], // Array of String
  scores: [Number] // Array of numbers
  // ... etc
});
```

##### practice(2 min)

Add favourites in user schema of type array of strings.

#### timestamps(2 min)

Timestamps provides us createdAt and updatedAt time for each and every document inserted into database once placed in Schema.

For a updated document, it updates updatedAt field on its own.

In order to use it, we place object after defining schema with **{timestamps: true}**

for example:

```js
var userSchema = new Schema(
  {
    // fields here
  },
  { timestamps: true }
);
```

##### practice (1 min)

1. Add timestamps to user and address schema.

## Model(5 min)

Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

To use our schema definition, we need to convert our `schema` into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

```js
// Our Schema is
var bookSchema = new Schema({
  // All fields are defined here
});
// We define model using mongoose.model
var Book = mongoose.model("Book", bookSchema);
```

`modelName` is used for all the interaction with mongodb database.

Finally after defining th model, we export it so that it could be used elsewhere in project.

```js
module.exports = Book;

// OR directly like
module.exports = mongoose.model("Book", bookSchema);
```

## Associations(15 min)

There are multiple associations defined in mongodb to query data from multiple
collections.

- One to One
- One to Many
- Many to Many

### One-to-One Association

In one to one association, a single document from one collection is referenced to
single document in other collection.

Suppose we have a user and each user has an address. In the similar fashion, each
address in address collection belongs to a single user.We reference both of them
by associating them through \_ids.

```js
//User document
{
  _id: ObjectId(jer477bc4grd637gd)
  name: '',
  email: '',
  // use Schema.Types.ObjectId to associate to address collection
  address: ObjectId('hf648gf474rhu4i')
}
// address document
{
  _id: ObjectId('hf648gf474rhu4i'),
  street: '',
  city: '',
  state: '',
  pincode: '',
  // This is a reference to above user table using Schema Types.ObjectId
  user: ObjectId(jer477bc4grd637gd)
}
```

##### practice (5 min)

Create a one to one reference between user schema and address schema.

#### Embedding and Referencing(10 min)

Embedded documents are where sub-document are present in same collection as parent
instead of creatng a new collection for subdocuments. This feature is called
denormalization.

In refercing, we create new collection for sub-document and reference
it to parent document. These are also known as normalized collection.

Example is the user and address model created in above example.

### One-to-many Association(10 min)

Suppose we have an article model and a comment model.
Each article has multiple comments which references to multiple document in comments
model.
In the same way, each comment belongs to a single article.
Here, each article has multiple commments whereas each comment belongs to a single article.

```js
// Article document
{
  _id: ObjectId("73hdjfh47ejh7h4")
  title: '',
  // Array of all associated comments ids
  comments: [ObjectId("5f895f943g95jg"), ObjectId("9j6g84g95fh5")]
}
// Multiple comment document of above aricle
[
  {
    _id: ObjectId("5f895f943g95jg"),
    title: '',
    // Contains reference to above article
    articleId: ObjectId("73hdjfh47ejh7h4")
  },
  {
    _id: ObjectId("9j6g84g95fh5"),
    title: '',
    // Referenece to same above article
    articleId: ObjectId("73hdjfh47ejh7h4")
  }
]
```

##### practice

Create a one-many association with article and comment model.

### Many-to-Many Association

In many to many association one document from collection A could have multiple references in document B and vice versa.

Suppose we have articles model and tags model.
An article can have multiple tags and similarily a tag can be present in multiple articles as well.

### Connect mongoose with mongodb(5 min)

In app.js, at the start itself we connect mongoose with our locally running mongodb server.

```js
mongoose.connect(
  "mongodb://localhost/DB_NAME",
  { useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("mongodb connected");
  }
);
```

#### Insert in database(10 min)

1. Insert Document in database

```js

Model.create({user object here}, (err, user) => {
  if(err) console.log(err);
  console.log(user)
})

// OR

var newUser = new User() // here user in the model name
newUser.name = 'xyz';
newUser.age = 20;
newUser.save((err, userCreated) => {
  // check for error or new user created
})

```

##### practice(10 min)

Insert into database some users through user model.

- create a user schema
- create user model based on schema
- connect to mongodb database using mongoose.connect()
- insert user into database using Model.create() OR model.save() function

# Day 6

## Express-generator

express-generator is an npm package which generates an express application with some predefined middlewares, routes and scripts to get started.

In order to use generators, we install **express-generator** globally on our system using _npm install -g express-generator_

The folder structure is: - bin - www // contains createServer method to start server - public // for storing static assets - routes // handle routing here - views // templates are present here - app.js // core of our application - package.json // metadata of project

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

models - User.js - user schema and models - Article.js - article schema and models

Once we have defined Model, we export it so that we could use it outside the model file.

##### practice

create a user schema and model and export it.

### routing convention

For each action(like create, update, delete) on any resource, we define unique urls(routes) which are going to handle specific event.

For example, take user resources, we need to handle routes for - create a user // POST request on "/users" - list users // GET request on "/users" - get single user // GET request on "/users/:id" - update a user // PUT request on "/users/:id" - delete a user // DELETE request on "/users/:id"

It should not take routes like `/users/createUser` or `/users/listUser`

We usually seperate routing from our main app.js file because of enormous size of file(app.js).

We use routes folder for all our routing.

express's router module is used to handle routing in routes folder.

```js
var express = require("express");
// use router module from express
var router = express.Router();

// handle all resource specific routes
router.get("/", (req, res) => {});
router.post("/", (req, res) => {});

// export router
module.exports = router;
```

For each resource, we create a file based on resource name and handle all routes related to that resource there itself.

For example, if we have routes related to users and blogs
file structure is:

routes - users.js // handle all user related routes here - blog.js // handle all blog related route here

##### practice

Inside user routes, create routes for - create a user // POST request on "/users" route - list all users // GET request on "/users" route - get single user // GET request on "/users/:id"

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

Create a user resource 1. generate User model 2. add a POST request on "/users" in user router. 3. Send user information from postman 4. Console user in req.body 5. Save user to database 6. return created user in response

### 2. Query Document

Querying database again uses models to interact to database.
We use `Model.find()`, `Model.findOne()`, `Model.findById()` methods to query documents from a database.
All Of them takes query as the first argument and returns callback as second.

```js
// query can be object or simply Id's in case of findById
Model.find(query, callback);
```

- Model.find returns all the document which matches query params.
- Simply `Model.find()` without any parameters returns all documents.

```js
Model.find(); // returns all document as an array of objects// [{}, {}, {}]
```

- Model.findOne returns first document which matches query params.

```js
// Returns the first match always
Model.findOne({ name: /sam/ }, (err, result) => {});
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

app.set("views", path.join(__dirname, "views")); // set views directory for all templates
app.set("view engine", "ejs"); // tell express to use ejs as templating engine
```

Once views directory and view engine is placed, we can call any templating from any routes by using **res.render(template name)**.

```js
res.render("about"); // call about.ejs file from views directory
```

##### practice

inside index route - add GET request on "/contact" and render contact.ejs with a contact form

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

## day-7

## CRUD

#### update document

In order to update a document, we usually handle PUT request on a specific route.

The route can be of the form

```js
router.put("/users/:id", callback);
```

We use `Model.update` to update a document.

It takes 4 arguments

- query(to find specific document for updation) // object or Id depending on method
- update(document to update) // {}
- options
- callback

for example, to update a document, we run

_Model.update(query, { name: 'jason bourne' }, options, callback);_

Query is used to find the document, which will be updated.

Valid options are: - upsert (boolean) whether to create the doc if it doesn't match (false) - multi (boolean) whether multiple documents should be updated (false) - runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.

The callback function receives (err, response). - err is the error if any occurred - response is the full response from Mongo

There are other method used to update a document. - UpdateOne - findOneAndUpdate - findByIdAndUpdate

In order to find a document by id and update it, we use **findByIdAndUpdate**.

```js
// find a document by id and update it
Model.findByIdAndUpdate(id, {updated document}, options, callback)

```

##### practice

update a user with new document from postman.

#### delete document

DELETE http method is used to delete a document.

`Model.delete()`, `Model.deleteOne()`, `Model.findOneAndDelete()`, `Model.findByIdAndDelete()` are used to remove one or multiple documents from a mongodb collection.

```js
// query is document to be deleted
Model.deleteOne(query, callback);
```

Query is finding the document to be deleted.

callback takes error as only argument to throw an error which is received while deletion of a document fails.

delete route can be like

```js
router.delete("/users/:id");
```

Entire example to delete a user using a route:

```js
router.delete('/users/:id', (req, res, next) => {
    var id = req.params.id;
    User.findByIdAndRemove(id, (err) => {
        if(err) //send error message
        // send success message
    })
})
```

##### practice

delete a document present in database by sending a request from postman.

#### create a resource using form

A route is used to display a ejs form which when submitted sends form data to a route which captures all form data and sends it to database to save.

For example, we will try to insert user through a form.

1. create a route for rendering user form i.e. GET request on "/users/new"

```js
router.get("/users/new", (req, res) => {
  res.render("userForm"); // userform is a template in views directory
});
```

2. Once a form is submitted, create a route for handling form data and saving it to database.

Usually to create a user, we do POST request on "/users".

Form has method and action attributes which can be specified to submit the form in the desired route with appropriate method.

```html
<form action="/users" method="POST">
  <input />
</form>
```

here, method and action attributes directs a form to be submitted on a particular path. In above example when a form is submitted, it does a post request on "/users" with form data.

Now, we need a route to handle the data submitted by form.

```js
router.post("/users", (req, res) => {
  var newUser = req.body;
  User.create(newUser, (err, createdUser) => {
    // handle response here
  });
});
```

##### practice

Add a form and submit a user to database through the form.

#### update resource using form

When an application requires to update a resource, it needs a form with all resource data so that a user could edit it. We need a route which will render a form with resource data.

In order to fetch resource data in form, we need route to include id of the resouce so that application could fetch resource from database using id and display it in form.

The route for rendering a form for editing a user resource should look like GET request **/users/:id/edit**

```js
router.get("/users/:id/edit", (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.render("editUser", { user: user });
  });
});
```

Once the form is edited, then we need a seperate route to update the resource with updated content from edited form.

We usually use _PUT request on "/users/:id"_ but since **PUT** method is not available in forms we can also handle it using **POST request on "/users/:id"**.

We have to update the editUser form to contain attributes i.e **method -> POST** and **action -> "/users/:id"**.

Once form is submitted, we need a route to handle update operation to database.

```js
router.post("/users/:id", (req, res, next) => {
  // fetch updated user from form
  var updatedUser = req.body;
  // here {new: true} returns updated document instead of older one
  User.findByIdAndUpdate(
    req.params.id,
    updatedUser,
    { new: true },
    (err, updated) => {
      // handle update here
    }
  );
});
```

## day-8

#### cookies

Cookies are small files which are stored on a user's computer. They are designed to hold
a modest amount of data specific to a particular client and website, and can be accessed
either by the web server or the client computer.

When you visit a website, the website sends the cookie to your computer. Your computer stores it in a file located inside your web browser.

The purpose of the computer cookie is to help the website keep track of your visits and activity. For example, many online retailers use cookies to keep track of the items in a user’s shopping cart as they explore the site.A website might also use cookies to keep a record of your most recent visit or to record your login information.

We use cookie-parser in express to send and receive cookies from web browser.

```js
var cookieParser = require("cookie-parser");
// We place them as middleware, so that each request have access to cookies from the browser.
app.use(cookieParser());
```

Once we have cookie Parser in place, we can create a custom cookie.

```js
app.use((req, res, next) => {
  // this creates a cookie named username in browser with value 'xyz'.
  res.cookie("username", "xyz");
});
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

We’ll use the _express-session_ module, which is maintained by the Express team.

In order to use express-session, we require it and place it as a middleware.

```js
var session = require("express-session");

// place as middlware after cookieParser()
app.use(
  session({
    secret: "jhdvjhfbdjhvjhdfhjv",
    resave: false,
    saveUninitialized: true
  })
);
```

Express session creates a session, stored in memory, on the server side for each unique request which contains a session id.

The session store defaults to a new MemoryStore instance.

It then takes session ID and creates a cookie in the browser named _connect.sid_. The
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

**resave** forces the session to be saved back to the session store, even if the session was never modified during the request. It takes _boolean_ as value.

**saveUninitialized** forces a session that is "uninitialized" to be saved to the store.

Once a session is created, we can access the session using **req.session**.

We can also set values into the session using request object.

```js
// setting values to session
req.session.username = "xyz";

// accessing a session
req.session.username; // returns 'xyz'
```

#### [practice]

    - add express-session as middleware
    - set username into session
    - try accessing session doing a seperate request

express-session uses MemoryStore as default memory which is very volitile.

Each server restart or killing a server erases sessions from memory store.

We use mongostore as persistent store for sessions. We use already connected mongodb instance to store sessions into a collection called _sessions_.

To instruct sessions to use mongo store, we require a npm package called connect-mongo to connect to mongoDb database and place a store key in sessions.

Make sure to require MongoStore after session, because it uses sessions to create store.

```js
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
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

We are going to hash the password in pre save() hooks because _pre save()_ hook is triggered before the _save()_ hook.

We are using bcrypt npm package's hashSync method to hash password. Bcrypt's hashSync takes 2 argument. - password to be hashed - salt factor or secret used to hash

```js
var bcrypt = require("bcrypt");
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

We can use this method by invoking it on user returned from database which follws userSchema i.e. _user.verifyPassword_.

Somewhere in login routes:

```js
User.findOne({ email: "" }, (err, user) => {
  // here user returned contains method defined on userSchema
  // we can run
  user.verfiyPassword();
  // it will check for verifyPassword on user schema
});
```

In the login routes, now we can verify a user credentials (email and password) to log a user in, if credentials match the one saved with database.

Steps are:

1. verify email
2. verify password
3. log user in

```js
router.post("/users/login", (req, res, next) => {
  // fetch email and password from form
  var { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    // check error
    // return next with error, so next codes in line are not executed
    if (err) return next(err);
    // check wrong email
    if (!user) return next("Please enter valid email");
    // check password
    // user userSchema's verifyPassword method which applies on returned user
    if (!user.verifyPassword(password)) return next("Incorrect password");
    // if true, credentials are correct
    // log the user in by adding user's id  it to session
    req.session.userId = user.id;
  });
});
```

Since sessions are persisted across multiple requests, we can check session on each requests to verify whether a user is logged in or not.

# day-9

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
routes - users.js
controllers - userController.js

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
});
```

##### practice

set your name in response locals and try to access it in templates

#### basic authorization

Authorization is where we provide access rights or authority to a group of users for a specific piece of resource in our application.

For example, if we have a blog site, then only a logged in user is authorized to create a blog or add comment on any other blog.

Once a user is logged in, we can check for his session to verify logged in user, once verified we can authorize him to create a blog or add comment.

One way possible is for each resourec, we can check session and redirect him accordingly.

```js
router.use("/dashboard", (req, res) => {
  if (req.session && req.session.userId) {
    res.render("dashboard");
  } else {
    res.redirect("/users/login");
  }
});
```

##### practice

- render '/users' routes only when a user is logged in, otherwise redirect to login or index page

The other method is, we create a authorization middleware that checks for a session and redirects accordingly. This authorization middleware will be created once, used where ever needed.

```js
var isUserLogged = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect("/users/login");
  }
};
```

Now, on a specific route, if we want to check for logged in user, all we have to do is to plug above middleware in between routes and controller action.

```js
router.get("/dashboard", isUserLogged, userController.dashboard);
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

create a middleware for checking logged in user - if logged, call next() - if not, redirect to login page - plug this middleware on all routes other than login and register.

#### user session middleware

One better approach to fetch logged in user details is to place a session middleware in app.js, which checks for a logged in session, as soon as application starts, before handling any request on one of the routes.

If a session is found, it retrieves user from session information and populates it in _request_ as well as _locals_ so that logged in user can be used in subsequent request handlers and also inside the templates.

Ideally we create a util folder in root of project and create a file named sessions.js to store all the middleware for checking sessions.

utils

- userSession.js

Alternatively, we can define these middleware functions inside a controller named `authController.js`.

```js
// inside userSession.js
// require user model
var User = require("../models/User");
exports.userLoggedSession = (req, res, next) => {
  if (req.session && req.session.userId) {
    var userId = req.session.userId;
    User.findById(userId, (err, user) => {
      if (err) return next("Invalid userId in session");
      // if user
      // put user into request object
      req.loggedUser = user;
      res.locals.loggedUser = user;
      next();
    });
  } else {
    req.loggedUser = null;
    res.locals.loggedUser = null;
    next();
  }
};
```

Now, we can place **userSession** in app.js to check for a logged in session, if yes, it is going to provide user details in subsequent requests as well as locals for templates to access it.

```js
// in app.js before handling routes
// require at the top
var userSession = require("./utils/userSession");
app.use(userSession.userLoggedSession);

app.use("/", indexRoutes);
app.use("/users", userRoutes);
```

Now we can access logged in user details on any routes by calling _req.loggedUser_.

If a user is logged in, we will get entire user back or null when no user is logged in.

We can also access user information in any templates, since we have also set user object in locals. It will return entire user object if logged in or null otherwise.

##### practice

create a session middleware - check for a user logged session - if present, fetch user information using userId present in session by calling User.findByID -

### partials

partials are reusable template component which can be used with other templates when required.

we can create a partials for header and footer component and use them in multiple templates when required.

structure looks like
views - partials(folder) - header.ejs - footer.ejs - index.ejs

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

# day-10

### passport

passport is a npm package used for authenticating users through 3rd party applications like facebook, google, github etc..

passport uses Oauth for authentication. Oauth means open authentication.

Advantages are: 1. No extra registrations required 2. use trusted, existing 3rd party apps 3. Embedded session support

Entire authentiaction is a 5 step process, which uses passport module to send requests for authenticated information from 3rd party applications.

#### step 1(create app)

create an oauth application with the provider. - go to their developers console - create an oauth application - specify redirect uris based on your routes in application - get clientId and secret from the application created.

ClientId and Secret obtained from application will be used on behalf of application for authentiacating users.

#### step 2(define routes)

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

#### step 3(strategy)

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

#### serializer and deserializer

These function are provided to log a authenticated user into the session.

##### serializer

As soon a a user is returned from strategy, it means a sucees redirect and serializer have access to the user information.

It takes the user info and creates a **passport.user** into the session and stores whatever is passed to the session.

```js
passport.serializeUser((user, done) => {
  done(err, user.id);
});
```

It takes authenticated user and done as callback and returns cb with error and user's id to be saved into session.

##### deserilizer

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

#### middlewares

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

# day 11

## REST API

REST stands for representational state transfer.

Each API endpoint represents a specific state of the application's resources and allowed
to transfer data representing that specific state.

API stands for application program interface. It is a means to interact between the application and the program serving data to that application.

A restful Application/Architecture is characterized by following: 1. State and functionaily are divided into multiple resources. 2. Every resource is uniquely addressable using uniform and minimal set of commands using HTTP commands of GET, POST, PUT, DELETE. 3. The protocol is client/server, stateless, layered and supports caching.

_REST defines 6 architectural constraints which make any web service – a true RESTful API_  
 1. Uniform Interface - A resource in the system should have only one logical URI and that should provide a way to fetch related or additional data. It’s always better to synonymise a resource with a web page.

    	- Any single resource should not be too large and contain each and everything in its representation.

    	- The resource representations across system should follow certain guidelines such as naming conventions, link formats or data format (xml or/and json).

    	- All resources should be accessible through a common approach such as HTTP GET and similarly modified using a consistent approach.

    2. Client/Server
    	- This essentially means that client application and server application MUST be able to evolve separately without any dependency on each other. A client should know only resource URIs and that’s all.

    3. Stateless
    	- Make all client-server interaction stateless. Server will not store anything about latest HTTP request client made. It will treat each and every request as new. No session, no history.

    	- If client application needs to be a stateful application for the end user, where user logs in once and do other authorized operations thereafter, then each request from the client should contain all the information necessary to service the request – including authentication and authorization details.

    4. Cacheable
    	- Caching brings performance improvement for client side, and better scope for scalability for a server because the load has reduced.

    	- In REST, caching shall be applied to resources when applicable and then these resources MUST declare themselves cacheable. Caching can be implemented on the server or client side.

    5. Layered System
    	- REST allows you to use a layered system architecture where you deploy the APIs on server A, and store data on server B and authenticate requests in Server C, for example.

    	- A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way.

    6.Code on demand(optional)
    	- Most of the time you will be sending the static representations of resources in form of XML or JSON. But when you need to, you are free to return executable code to support a part of your application e.g. clients may call your API to get a UI widget rendering code. It is permitted.

Node applications are primarily used for 2 main purposes.

1. Server side rendered application
2. Serving APIs for client side applications

As an API server, it handles all endpoints which serve one or multiple client applications.

Based on client requirements, it handles requests from the clients through multiple API
endpoints and serves the resoures respectively.

An API server in node/express is not much diffenrent from normal server side rendered application, we avoid templates and serve all requests with json response.

Whenever routes in node/express is used to serve as APIs for external application, we prefix the routes with `/api` to indicate that these are api routes.

```js
router.get("/api/users", (req, res, next) => {
  Model.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    res.json({ users });
  });
});
```

##### practice

create a books resource using an express applications

- handle all API endpoints for book resource
  1. GET /api/books - list of all books
  2. GET /api/books/:id - get single book
  3. POST /api/books - create a book
  4. PUT /api/books/:id - update a book
  5. DELETE /api/books/:id - delete a book

### API Versioning

Sometimes, we create an API server with some endpoints which is contantly in use by some clients. Now after some time, we decided to modify the endpoints to add some new features, new endpoints and modify the structure of previous endpoints.

Since the API server is already in use, if we modify the existing endpoints, it may break the clients application who are using it.

In Order to avoid such scenarios, we version API endpoints so that a later version APIs could contain updated endpoints without affecting the older ones. At this point, both API versions exists simuntaneously without affecting each other.

```js
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);
```

While developing API server, we generally use `POSTMAN` as client to mock API requests from the client.

# day -12

What Are JSON Web Tokens?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and
self-contained way to securely transmit information between parties as a JSON Object.
This information can be verified and trusted because it is digitally signed. JWTs can be
signed using a secret.

- Compact: Because of its size, it can be sent through an URL, POST parameter, or
  inside an HTTP header. Additionally, due to its size its transmission is fast.

- Self-contained: The payload contains all the required information about the user, to
  avoid querying the database more than once.

JWTs basically consist of three parts separated by a '.' . These are the header, payload
and signature.

A JWT typically looks like the following.

`xxxxx.yyyyy.zzzzz`

#### How JSON Web Tokens Work

In authentication, when the user successfully logs in using his credentials, a JSON Web
Token will be returned and must be saved locally (typically in local storage, but
cookies can be also used), instead of the traditional approach of creating a session in
the server and returning a cookie.

Whenever the user wants to access a protected route, it should send the JWT, typically in
the Authorization header. Therefore, the content of the header should look like the
following:

Authorization: <token>

This is a stateless authentication mechanism as the user state is never saved in the
server memory. The server’s protected routes will check for a valid JWT in the
Authorization header, and if it is there, the user will be allowed. As JWTs are
self-contained, all the necessary information is there, reducing the need to go back and
forth to the database.

This allows the user to fully rely on data APIs that are stateless and even make requests
to downstream services. It doesn’t matter which domains are serving your APIs, as
Cross-Origin Resource Sharing (CORS) won’t be an issue since it doesn’t use cookies.

#### How session works?

A user’s credentials are sent as a POST request to the server. The server authenticates the user. If the credentials are valid, the server responds with a cookie, which is set on the user’s browser and includes a `SESSION ID` to identify the user. The user sessions are stored in memory either via files or in the database on the server.

While the user stays logged in, the cookie would be sent along with every subsequent request. The server can then compare the session id stored on the cookie against the session information stored in the memory to verify user’s identity and sends response with the corresponding state.

#### JWTs vs. Sessions

1. Scalability

- Session based authentication: Because the sessions are stored in the server’s memory, scaling becomes an issue when there is a huge number of users using the system at once.

- Token based authentication: There is no issue with scaling because token is stored on the client side.

2. Multiple Device

- Session based authentication: Cookies normally work on a single domain or subdomains and they are normally disabled by browser if they work cross-domain (3rd party cookies). It poses issues when APIs are served from a different domain to mobile and web devices.

- Token based authentication: There is no issue with cookies as the JWT is included in the request header.

3. Performance:

- Token based auth: A critical analysis of this is very necessary. When making requests from the client to the server, if a lot of data is encoded within the JWT, it creates a significant amount of overhead with every HTTP request.
- session based auth: However, with sessions, there is only a tiny amount of overhead because SESSION IDs are actually very small.

##### benefits of using JWTs

- They have the ability to create truly RESTful Services
- They have built-in expiration functionality.
- They are easy to scale horizontally
- JSON Web Tokens are self-contained.

### jsonwebtoken

jsonwebtoken is a NPM package which we are going to use for generating and verifying token on the server side.

Whenever a user logs in successfully on our site, we will generate a JWT token and send it to client in response.

```js
var jwt = require("jsonwebtoken");

jwt.sign(payload, secret, callback => {});
```

- Signing JWT requires payload or claims which could be any object with some logged user information ie. \_id or email address.

```js
{
  userid: user._id;
} //payload
```

- Secret is any random strong string combination for generating signature.

- Callback function returns either error or token which is generated.

```js
jwt.sign({userId: user._id, "thisisasecret", (err, token) => {
  // send the token to client
  res.json({ token });
}})
```

Once the token has been sent to client, its clients responsibility to store the token somewhere either in localStorage or cookies.

Now for each resource which is protected on the server, client has to send request along with token present in request headers.

```js
{
  Authorization: <token>
}
```

On the server side, each request for protected routes contains JWT token.

Server creates a middleware for handling validity of token on each request.

Since the token is being sent via headers, server ckecks for token inside headers. If
token is present, validates the token via `jsonwebtoken's verify method and once token is validated, allow request to proceed further.

```js
var jwt = require('jsonwebtoken');
jwt.verify(token, secret, (err, payload) => {
  if(err) // invalid token
  // token is validated, proceed to next request
})
```

Entire middleware for validating token looks something like:

```js
var jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    // use same secret used while generating token
    jwt.verify(token, secret, (err, payload) => {
      // error if token has been tempered
      if (err) return res.status(400).json({ err });
      // put payload info into request and allow request to proceed by calling next
      req.user = payload;
      next();
    });
  } else {
    res.status(401).json({ error: "token is required" });
  }
};
```

We can place this middlleware before all protected routes

- if there is no token, an error message with token is required message will be sent back to client.

- if token has been changed or modified, it will be invalidated and an error message will be sent.

- if token is valid, payload which contains logged user information is made availbale in request, so that it can be used in subsequent middlewares or routes.

- lastly, we call next to allow valid users to proceed to next middleware for execution along with logged user informtion present in request.
