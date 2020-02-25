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

#### How session works ?

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
var jwt = require('jsonwebtoken');

jwt.sign(payload, secret, callback => {})

```

  - Signing JWT requires payload or claims which could be any object with some logged user information ie. _id or email address.

```js
{userid: user._id} //payload
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
var jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  var token = req.headers.authorization;
  if(token) {
    // use same secret used while generating token
    jwt.verify(token, secret, (err, payload) => {
      // error if token has been tempered
      if(err) return res.status(400).json({ err })
      // put payload info into request and allow request to proceed by calling next
      req.user = payload;
      next();
    })
  } else {
    res.status(401).json({ error: 'token is required' })
  }

}
```

We can place this middlleware before all protected routes
  - if there is no token, an error message with token is required message will be sent back to client.

  - if token has been changed or modified, it will be invalidated and an error message will be sent.

  - if token is valid, payload which contains logged user information is made availbale in request, so that it can be used in subsequent middlewares or routes.

  - lastly, we call next to allow valid users to proceed to next middleware for execution along with logged user informtion present in request. 
