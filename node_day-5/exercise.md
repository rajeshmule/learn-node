Q1. Create a user Schema
    - require mongoose
    - create a schema using mongoose
    - define name, email, age field with appropriate types
    - add {timestamps: true } for createAt and updatedAt date fields

Q2. Create a model named 'User' based on user schema.

Q3. Insert a User into database using User.create

Q4. Add required validator on name and unique index on email field in user schema.

Q5. Add a default value to age field in user schema i.e 18.

Q6. Insert a User again 
    - with just name field and observe the error returned.
    - with name as blank string and observe error
    - try inserting 2 document with same email and observe error.

Q7. Add a nested address object inside user schema with fields street, city, state and pin.

Q8. Try inserting user schema with nested address fields.

Q9. Create a seperate address schema and model with fields street name, city, state and PIN and user of type ObjectId to store user's id.

Q10. Insert into address model street, city, state, pin and user with a user id from one of the users created previously. 

Q11. Create a article Schema
    - insert fields title, description, likes, author(ObjectId of User)
    - add required validation on title and author field
    - default likes to 0.
    - create a model named 'Article'
    - Insert 2 document using Atricle Model

Q12. Create a comment Schema
    - insert name, timestamps, user(ObjectId of user), article(ObjectId of Article)
    - add required validator to name and user
    - create a Comment model
    - insert 2 documents each for an article created in Q11. 
