const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User');

const port = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/day5';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// get all users
app.get('/users', (req, res) =>
{
    User.find({}, (err, users) =>
    {
        if (err) return res.send(err);
        res.json({ users });
    });
});
// create user
app.post('/users', (req, res) =>
{
    const data = req.body;
    User.create(data, (err, createdUser) =>
    {
        if (err) return res.send(err);
        // res.json(createdUser);
        User.find({}, (err, users) =>
        {
            if (err) return res.send(err);
            res.json({ users });
        });
    });
});
// find by id 
app.get('/users/:id', (req, res) =>
{
    const id = req.params.id;
    User.findById(id, (err, findUser) =>
    {
        if (err) return res.send(err);
        res.json(findUser);
    });
});
// delete one user 
app.delete('/users/:id', (req, res) =>
{
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, deletedUser) =>
    {
        if (err) return res.send(err);
        console.log('User successfully removed.');
        res.json(deletedUser);
    })
});
// update user
app.put('/users/:id', (req, res) =>
{
    const id = req.params.id;
    const updateData = req.body;

    User.findByIdAndUpdate(id, updateData, (err, user) =>
    {
        if (err) return res.send(err);
        console.log('user is updated');
        res.json("uesr is updated");

    });
});


app.listen(port, () =>
{
    console.log('Server listening on port ' + port);
});