const express = require('express');
const { connect } = require('mongoose');

const User = require('./models/Users');

const port = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/day5-exerice';

connect(mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>
{
    console.log("mongodb is connected");
}).catch(err => console.log(err.reason));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users', (req, res, next) =>
{
    const data = req.body;
    User.create(data, (err, createdUser) =>
    {
        if (err) return next(err);
        res.json({ createdUser });
    });
});



// catch 404 and forward to error handler
app.use((req, res, next) =>
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handler

app.use((err, req, res, next) =>
{
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

app.listen(port, () =>
{
    console.log(`server runing on :  ${port}`);
});
