const http = require('http');
const fs = require('fs');
const url = require('url');

// Create a basic server and listen for request on port 5000.


const requestListener = function (req, res) {
    fs.readFile('./index.html', (err, content) => {
        if (err) return res.end(err);
        res.setHeader('content-type', 'text/html');
        res.end(content);
    });
}

const server = http.createServer(requestListener);

server.listen(8080);