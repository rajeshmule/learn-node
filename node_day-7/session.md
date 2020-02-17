## CRUD

#### update document
In order to update a document, we usually handle PUT request on a specific route.

The route can be of the form

```js
router.put('/users/:id', callback)
```

We use `Model.update` to update a document.

It takes 4 arguments
  - query(to find specific document for updation) // object or Id depending on method
  - update(document to update) // {}
  - options
  - callback

for example, to update a document, we run

*Model.update(query, { name: 'jason bourne' }, options, callback);*

Query is used to find the document, which will be updated.

Valid options are:
    - upsert (boolean) whether to create the doc if it doesn't match (false)
    - multi (boolean) whether multiple documents should be updated (false)
    - runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.

The callback function receives (err, response).
    - err is the error if any occurred
    - response is the full response from Mongo

There are other method used to update a document.
    - UpdateOne
    - findOneAndUpdate
    - findByIdAndUpdate

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
Model.deleteOne(query, callback)
```
Query is finding the document to be deleted.

callback takes error as only argument to throw an error which is received while deletion of a document fails. 

delete route can be like
```js
router.delete('/users/:id');
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
router.get('/users/new', (req, res) => {
    res.render('userForm') // userform is a template in views directory
})
```

2. Once a form is submitted, create a route for handling form data and saving it to database.

Usually to create a user, we do POST request on "/users".

Form has method and action attributes which can be specified to submit the form in the desired route with appropriate method.

```html
<form action="/users" method="POST" >
    <input>
</form>
```
here, method and action attributes directs a form to be submitted on a particular path. In above example when a form is submitted, it does a post request on "/users" with form data.

Now, we need a route to handle the data submitted by form.

```js
router.post('/users', (req, res) => {
    var newUser = req.body;
    User.create(newUser, (err, createdUser) => {
        // handle response here
    })
})
```

##### practice
Add a form and submit a user to database through the form.

#### update resource using form
When an application requires to update a resource, it needs a form with all resource data so that a user could edit it. We need a route which will render a form with resource data.

In order to fetch resource data in form, we need route to include id of the resouce so that application could fetch resource from database using id and display it in form.

The route for rendering a form for editing a user resource should look like  GET request **/users/:id/edit**

```js
router.get('/users/:id/edit', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return next(err);
        res.render('editUser', {user: user});
    })
})
```

Once the form is edited, then we need a seperate route to update the resource with updated content from edited form.

We usually use *PUT request on "/users/:id"* but since **PUT** method is not available in forms we can also handle it using **POST request on "/users/:id"**.

We have to update the editUser form to contain attributes i.e **method -> POST** and **action -> "/users/:id"**.

Once form is submitted, we need a route to handle update operation to database.

```js
router.post('/users/:id', (req, res, next) => {
    // fetch updated user from form
    var updatedUser = req.body;
    // here {new: true} returns updated document instead of older one
    User.findByIdAndUpdate(req.params.id, updatedUser, {new:true}, (err, updated) => {
        // handle update here
    })
})
```





