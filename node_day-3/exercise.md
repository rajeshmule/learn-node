Q1. Create a server using http
    1. handle post method on '/' route
    2. send json data on it from postman
    3. capture data from request using data and end event on request object
    4. when end event fires, send captured data in response with status code 201.

Q2. Follow above steps with form data from postman instead of json data.

Q3. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
    - format of json data is {name: your name, email: "", }
    - Html response format is <h1>Name</h1><h2>email</h2>

Q4. Follow Q3 with form data containing fields i.e name and email. Parse form-data using querystring module.

Q5. Follow Q1 and save the json data in project folder using fs.writeFile into a file locally.
    Folder structure
        - server.js
        - data(folder)
            - create filename using username and append `.json` in last.

Q6. Follow Q5 with form data.

#### Final Project

Convert a 4-5 page layouts website into node application.
Steps are:
1. Create seperate route for all html pages.
2. handle css and images linked to html pages.
3. Add a contact us page on route */contact* and method *GET* and send html file with a contact form containing name, email, phone.
4. Submit the form and handle a *POST* request on */contact* and save form data in local project directory.
