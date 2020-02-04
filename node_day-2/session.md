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




