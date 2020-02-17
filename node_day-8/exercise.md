1. create a user registration and login system.
    - create a user registration route with fields
        - name
        - email
        - password

    - use bcrypt's async method to hash password(pre save hook)
    - add methods on schema to verifyPassword using bcrypt's compare async method
    - add login routes and implement login
    - use express-session to create a session for looged in user
    - use mongodb store to presist session 
    - implement logout method

2. Clone medium with article and user model.
    - implement user login
    - allow users to create articles
    - allow user to add comments for each article.