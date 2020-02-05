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









