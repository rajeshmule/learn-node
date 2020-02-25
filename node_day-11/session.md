## REST API

REST stands for representational state transfer.

Each API endpoint represents a specific state of the application's resources and allowed
to transfer data representing that specific state.

API stands for application program interface. It is a means to interact between the application and the program serving data to that application.

A restful Application/Architecture is characterized by following:
	1. State and functionaily are divided into multiple resources.
	2. Every resource is uniquely addressable using uniform and minimal set of commands using HTTP commands of GET, POST, PUT, DELETE.
	3. The protocol is client/server, stateless, layered and supports caching.

*REST defines 6 architectural constraints which make any web service – a true 			RESTful API*  
	1. Uniform Interface
		- A resource in the system should have only one logical URI and that should provide a way to fetch related or additional data. It’s always better to synonymise a resource with a web page.

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
router.get('/api/users', (req, res, next) => {
  Model.find({}, (err, users) => {
    if(err) return res.status(500).json(err);
    res.json({ users });
  })
})
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
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

While developing API server, we generally use `POSTMAN` as client to mock API requests from the client.