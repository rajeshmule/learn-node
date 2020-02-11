// Require express
const express = require('express');
const path = require('path');
// mount express application on app variable
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use('/', (req, res, next) =>
{
    console.log(req.method, req.url);
    // console.log(req.body);
    next();
});
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) =>
{
    console.log("in /");
    res.send("Hello index");
});



app.get('/about', (req, res) =>
{
    console.log("in /about");
    res.send("hello get about");
});


app.get('/projects', (req, res) =>
{
    console.log("in /projects");
    res.send("Hello projects");
});

app.post('/usres', (req, res) =>
{
    console.log(req.body);
    res.send("Hello");
});





// Define a port
const port = process.env.PORT || 4000;

// Add listener for server to listen on a port
app.listen(port, () =>
{
    console.log('Server listening on port ' + port);
});
