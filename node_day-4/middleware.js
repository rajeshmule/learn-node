var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var port = process.env.port || 4000;
var app = express();

// Build in middlewares
app.use(express.json()); // Fetch json data using req.body

app.use(express.urlencoded({
    extended: false
})); // Fetch form data using req.body

app.use(express.static(path.join(__dirname, 'public'))); // Sets public folder for assets

// // Passing error as middleware
// app.use((req, res, next) => {
//   next('wrong input');
// });

// Third party middleware
app.use(logger('dev')); // Logs information of request in console
app.use(cookieParser()); // Adds cookie to request 

// Route middleware
app.get('/', (req, res) => {
    res.send('hello World!')
});


// Error handler middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(500).send('Something went wrong.')
});


// listener
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
