const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/newusers';

var usersRouter = require('./routes/users');

//connect mongodb 
mongoose.connect(mongodbUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000
}, () =>
{
    console.log("mongodb is connected");
}).catch(err => console.log(err.reason));



// inst
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/users', usersRouter);

app.use((req, res, next) =>
{
    res.status(404);
    res.send("Page not found");
});


//An error handling middleware
app.use((err, req, res, next) =>
{
    res.status(500);
    res.send("Oops, something went wrong.")
});


app.listen(port, () =>
{
    console.log('Server listening on port ' + port);
});