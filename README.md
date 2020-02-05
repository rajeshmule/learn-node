# Learn Node.js

# Day-1
## 1. What is node ?(10 min)

Node.js is an open-source, cross-platform, runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript.

Node.js is a packaged compilation of Google’s V8 JavaScript engine, the libuv platform abstraction layer, and a core library, which is itself primarily written in JavaScript.

There are other independent libraries also used by nodeJS apart from few listed above. 

The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS). 

As such, the environment omits browser-specific JavaScript APIs and adds support for more traditional OS APIs including HTTP and file system libraries.

## 2. Computer Execution(5 min)

Computer does not understands higher languages like html, css or js. It only understands binary ie 1 and 0. There are tools available which converts those languages into binary.

  1. Compilers
    - turns source code into executables(machine code)
  2. Transpilers
    - turns source code into source code of other type
    - like coffeescript to javascript or scss /sass to css
  3. Interpreters(compile+execute)
    - take source code and execute it by taking realtime intermediate steps like compiling it.

### 3. v8 (5 min)

v8 engine is the runtime environment for nodejs. Node build on top of chrome v8 javascript engine.

v8 is single threaded(performs one task at a time) and used for core javascript computation.

Call Stack is part of v8 which is responsible for executing functions in javascript.We will discuss callstack later.

v8 engine acts as an interpreter in our system.

Examples of javscript engines
    1. JavascriptCore(safari)
    2. Spidermonkey(firefox)  
    3. chakra(IEx)

##### Questions(5min)
1. what is node ?
2. differentiate compiler, transpiler and interpreter.
3. explain v8
4. Any 2 other javascript engines ?

## NodeJS presents itself as 2 apps 

### 1. REPL(Read Eval Print Loop)(5 min)
  - inteactive jS runtime which execs JS code on go
  - like console in browsers
  - starts event loop in background and waits for code snippets
  - for running REPL type **node** in TERMINAL
  ```js
  node
  ```

  Steps are
    - reads code from terminal
    - evaluates them
    - prints the result
    - starts the same loop again ie waits for code snippet

##### Practice(5 min)
    1.open REPL
    2.execute some javascript code(2+2)

##### Questions(5 min)
    Explain steps in REPL?


### 2. A Script processor(10 min)
  - Initialises process called event loop in background
  - Reads in file you specify
  - Reads all deps in file and all deps of those file
  - Executes sync tasks as soon as encountered in those files.
  - Processes todo list of async task(Non-blocking) by repeating event loop until it has nothing to do.

#### example for running a node script

```js
node index.js(script_file name)
```

##### Practice(5 min)
Write a script(index.js) and run it using **node index.js**

#### Require(CommonJS pattern)(5 min)
Require is a global in nodejs used to fetch extenal resoures into a file. 

Globals can be used directly in nodejs without importing or requiring it.

Example is
```js
var fs = require('fs');
```

#### Core node modules(5min)

These modules are available in the projects, you simply have to require them in order to use them in your project. For example Filesystem aka fs module is inhereted in every node project. 

In order to use them: 

```js
var fs = require('fs');
```
##### Questions(5 min)
1. Explain globals ?
2. Define fs module ?

##### Practice(10 min)
1. require fs in a file and use fs.readFile to read content of a file.
```js
fs.readFile(filepath, (err, file) => {

})
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
buf.toString()
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
fs.readFileSync()
```

All Async function are non-blocking in nature. They continue in background and allow callstack to execute next function in line.

```js
fs.readFile()
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

#### 3 parts of http request

##### 1. URLs

Request URLs consists of multiple parts.
Example is *https://blog.altcampus.io:80/students/register?name=suraj&gender=male*
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
var url = require('url');
url.parse("https://blog.altcampus.io:80/students/register?name=suraj&gender=male", true);
```

##### 2. Headers

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
    - accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    - cookie: _ga=GA1.2.1198025837.1533318161; dwf_sg_task_completion=False; dwf_contrib_beta=False; _gid=GA1.2.283126628.1551861552
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
    
#### 3. Body(optional)
This is an optional field which is only sent when user is trying to submit any form data to the server.

##### Practice(5 min)
Do a request on google.com and view headers inside developer's network tab by clicking on a specific request.



### module.exports(5 min)
Node’s module system makes use of a global function called require and a global object called module.exports. The two make for a straightforward module system.

Nodes module system creates a dependency tree, which tells node which file are needed to run the application.

Module.exports is used to export functions, objects, variables to other files which will use require global in order to use them.

# Day-2

## http's createServer(15 min)
Node's inbuilt http or https module is used to create a server. HTTP module's createServer method is used to create a server.

It receives request and response objects as callbacks which are responsible for acting on a specific request received. Based on a request, a response is send back to the caller and the cycle terminates after ending the response using response.end().

createServer method takes request and response as callbacks. Request can be aliased as *req* and response as *res*. This callback (req, res) is referred to as *request handler functions*.

```js
var http = require('http');

http.createServer((request, response) => {
  // Do the handling part here..
});

// OR

http.createServer((req, res) => {
// handling and sending response here.. 
})
```

At last, we listen for requests on a specific port and host so we have to define a listener method at the end of the createServer method. Hostname is optional and defaults to `localhost`. Listen method takes an optional 3rd parameter as callback.

```js
var port = 3000;
var hostname = 'localhost' || '127.0.0.1'
http.createServer((req, res) => {
  // handle response here ..
}).listen(port, hostname);

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

#### HTTP Request Methods(5 min)
There are multiple methods used to do request over HTTP.
    1. GET - fetch information
    2. POST - Insert data for first time
    3. PUT - Update data(replace previous record)
    4. DELETE - Delete data
    5. PATCH - Update a part of it

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
    res.setHeader('Content-Type', 'text/plain');
    // Set multiple headers
    res.writeHead(200, {'Content-Type': 'text/html'}) 
    // Write to a response
    res.write('hello world!'); 
})

```
##### practice
Add statusCode and headers to response in Server

#### handling request on multiple routes(10 min)
In order to handle multiple requests on our server, we need to extract the **url** or **pathname** from requested url.

Once we have urls, we can run multiple if condition to check for a specific url and return respective content using res.write().

```js
http.createServer((req, res) => {
    if(req.url === '/') {
        // send response
    } else if (req.url === '/about') {
        // send another response
    } else {
        // Send error message
    }
})
```

##### practice
1. handle request on '/' and send 'welcome to homepage' in response.
2. handle request on '/about' and send response 'this is all about NodeJS'.

#### handling multiple http methods on same route(10 min)
There are different HTTP methods used to do request on same route. Same route can be used to handle different requests usnig different HTTP methods.

for example, we can handle GET on '/' as well as a POST request on '/'. Both these requests will be treated as different request.

```js
http.createServer((req, res) => {
    if(req.method === 'GET') {
        // handle get request
    } else if (req.method === 'POST') {
        // handle post request
    }
})
```

#### Fetch query params from request(10 min)
In order to fetch query params, we need to parse the entire url received from request using **req.url** using node's inbuilt url module.

Suppose url is *http:localhost:3000?name=test*'

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

# Day-3

#### Absolute and relative path(10 min)
Absolute path provides path of a file or directory from the root of the system.

__dirname is used to get absolute path of directory in which it is called.
__filename is used to get absolute path of file.

##### practice 
console.log(__dirname);
console.log(__filename)

Relative path provides path of a file from where it is called.

Example :
    test(folder)
        - index.js
        - app.js

If app.js is required from index.js
```js
var app = require('./app.js')
```
#### path module(10 min)
path is a core node module.

We use join method from path module to join file path to a directory.

```js
var path = require('path');
var indexPath = path.join(__dirname, 'index.js')
``` 


### EventEmitter(15 min)
EventEmitter class is defined on *events* core node module. This forms the core of event driven architecture where certain kind of objects called emitters periodically emit events that cause listener objects to be called.  

Examples are
    1. http's createServer method
    2. request object received as createServer callback
    3. fs.createReadStream method

All methods which belong to eventEmitter class emit some named events.

Examples are   
    1. createServer method emits **request** and **error** events.
    2. request emits **data** and **end** events

In order to listen to those events, we use listeners methods defined on those events using *".on"* event.

It takes named event as first argument and callback function as second.

For example 
```js
var server = http.createServer();
    // request is named event emitted by createServer
server.on('request', function(req, res) {
    // Handle response here
})
```

**createReadStream** method is also an eventEmitter which emits *data* event in order to capture data and *end* event when entire file is read.

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

#### Capturing data from request body(15 min)

All the request information along with optional data is present in *request* object received as callback from createServer method.

Request Object also belongs to eventEmitter class and emits event.

In order to capture data coming from optional body, we listen for **data** and **end** event on request object.

Data received during *data* event are broken into smaller chunks and received as callback function with chunk of information. We store all chunks.

```js
var store = "";
req.on('data', (chunk) => {
    store += chunk.toString();
})
```

When all data is received *end* event fires with a callback function with no arguments to mark data completion.
```js
req.on('end', () => {
    // Send response here
})
```

After the end event fires, we can send response.

The entire operation may look like: 
```js
var http = require('http');
http.createServer(function(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk.toString();
    });

    req.on('end', () => {
        // parse store data
        // Send a response
    })
})
```

If data is send along with request, here on server we captured data and saved into store variable.

If no data is send, *end* event fires automatically and store variable is empty string.

Data can be send in one of these 2 formats
    1. Form data(using html forms)
    2. JSON data

Now we need to parse received data stored in store varibale.

#### Parse JSON data(10 min)
**JSON.parse** is used to parse json data.
Example: 
```js
JSON.parse(store);
// It returns data in proper object format.
```

##### practice(5 min)
send json data from postman and pasre it into the server.

#### Parse form data(10 min)
 Form data is often received in query string format. 
 Example is *"name=abc&email=abc@gmail.com&age=24"*

 In order to parse form data, we use **querystring** module from core node.

 ```js
 var querystring = require('querystring');
 querystring.parse(store) // returns object

 ```

##### practice
send form data from postman and parse it into the server.


 #### display HTML file in response(10 min)

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

 ##### practice(10 min)
 Render HTML file in response using http's createServer method with associated css and images. 

