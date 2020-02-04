1. Create a basic server and listen for request on port 5000.
2. create a server and return a respnse 'My first server in NodeJS' and listen on port 5100;
3. create a server and console request headers, request url and request method.
4. create a server and return entire request headers in response.
5. create a server and set status code 202 in response.
6. create a server and return an HTML response(<h3>Welcome to altcampus</h3>) along with        setting header using res.setHeader.
7. Repeat above (question 6) with header as writeHead.
8. Handle 2 different requests
    1. GET on '/' route where return some plain text
    2. GET on '/about' route and return your basic information as HTML page.
    
9. Handle 2 requests on same route with different method
    1. GET on '/users' route where return a simple HTML form with name and email field
    2. POST on '/users' route with a message 'Posted for the first time'.

10. Handle query params from the request on following url:
    - req url is `/users?email=nodeserver@gmail.com`
    - parse the  request url using parse method from url module
    - console pathname and return query params in response. 

