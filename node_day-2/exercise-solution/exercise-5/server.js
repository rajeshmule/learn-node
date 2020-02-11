const http = require('http');

// Create a basic server and listen for request on port 5000.


const requestListener = function (req, res) {
    // console.log({ "Headers": req.headers, "Url": req.url,  "Method": req.method});
    res.writeHead(202);
    res.end("set status code 202");
}

const server = http.createServer(requestListener);

server.listen(8080);