const http = require('http');

// create a server and return entire request headers in response.

const requestListener = function (req, res) {
    // console.log({ "Headers": req.headers, "Url": req.url,  "Method": req.method});
    res.writeHead(200);
    res.end(res.headers);
}

const server = http.createServer(requestListener);

server.listen(8080);