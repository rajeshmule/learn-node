1. create an express app using express-generator.

   - use ejs as template engine
   - create an article model with fields
     - title
     - description
     - tags // array of string
     - timestamps
   - create a route for inserting articles into database
     - send request from postman
   - create a route and display list of articles on a webpage using templates
   - create a route for displaying single article on a webpage using templates

2. create another express app using express-generator.
   - use ejs as template engine
   - create an author model with fields
     - name
     - photo url
     - email
     - timestamps
   - create an book model with fields
     - title
     - description
     - number of pages
     - author // reference, as objectId
     - genres // multiple. Array of strings
     - timestamps
   - create a route for inserting an author into the database
     - send request from postman
     - add atleast 5 authors
     - check if the data is saved in database or not by looking up in mongo shell.
   - create a route for inserting a book into the database
     - send request from postman, make sure to reference author field properly.
   - create a route and display list of authors on a webpage using templates
   - When the name of an author is clicked it should take us to a page that lists all his/her corresponding books.
   - create a route for displaying list of books on a webpage using templates
