const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', (req, res, next) =>
{
    console.log(`${req.method} at ${req.url} on`);
    // res.send(`${new Date()}`);
    next();
});

app.use('/', (req, res, next) =>
{
    console.log(`${req.method} at ${req.url} on ${new Date()}`);
    // res.send(`${new Date()}`);
    next();
});

app.get('/', (req, res) =>
{
    res.send("Hello world solution day-4");
});

app.listen(port, () => console.log(`Server running on port : ${port}`));