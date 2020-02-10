1. Create a basic express server with a single route '/' and method GET and send 'hello world' in response.

2. Create a middleware thats logs request method and request url and host from request headers in console on every request.

3. create a middleware that consoles the current time when a request is made on '/' route.

4. Add express.json() middleware
    1. send a POST request on '/' route with JSON data from postman.
    2. Send json data back in response.

5. Add express.urlencoded middleware
    1. send a post request on '/add' route with form data containing field like name, email and age
    2. send form data back to response

6. Handle a GET request on route '/static'.
    1. send a file called 'index.html'
    2. attach some images and css into index.html
    3. add express.static middleware in app middleware
    4. put all images and css into `public` folder created by static.
    5. check whether static path is rendering correctly or not?

7. add morgan logger as middleware in applcation.
    1. require morgan
    2. check morgan npm package on npmjs.com
    2. use morgan as middleware with 'short' format of logger.

8. Add cookie-parser as middleware 
    1. set a cookie(your name) in a middleware.
    2. create a middleware and fetch cookie set by previous middleware.

9. add a page not found middleware after all the routes have been handled.

10. Add an error handler middleware after previous middleware. 

11. Add a GET request on '/users/:name'
    1. capture name and send response with 'hello <name>'

12. Convert your portfolio into express application.
