const http = require('http');

// Create a basic server and listen for request on port 5000.


const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('My first server in NodeJS');
}

const server = http.createServer(requestListener);

server.listen(5100);