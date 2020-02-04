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

