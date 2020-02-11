# Mongoose(5 Min)
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
5. ObjectId - stores unique _id of other document(Schema.types.ObjectId)
6. Array - store an array of documents

#### Creating schema(10 min)
We will be using mongoose to create a schema. Schema is a class defined on mongoose.

Steps are
  1. Require mongoose
  2. use mongoose to create a new Schema object.
  3. Add fields to the schema object using key, value pairs.
  
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // add fields here
})
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
})
```


####  The unique Option is Not a Validator(5 min)

A common gotcha for beginners is that the unique option for schemas is not a validator. It's a convenient helper for building MongoDB unique indexes.
```js
var userSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
})
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
var userSchema = new Schema({
    // fields here
}, { timestamps: true} )

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
var Book = mongoose.model('Book', bookSchema);
```
`modelName` is used for all the interaction with mongodb database.

Finally after defining th model, we export it so that it could be used elsewhere in project.

```js
module.exports = Book;

// OR directly like
module.exports = mongoose.model('Book', bookSchema);

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
by associating them through _ids.

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
mongoose.connect("mongodb://localhost/DB_NAME", {useNewUrlParser: true}, (err) => {
  err ? console.log(err) : console.log('mongodb connected');
})
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