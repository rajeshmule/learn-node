const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer(newFunction()).listen(8080, () => console.log("runing server on 8080 \n"));

function newFunction() {
    return (req, res) => {
        console.log({ "Method": req.method, "Url": req.url, "Headers": req.headers });
        let parseUrl = url.parse(req.url, true);
        console.log("parsed url", parseUrl);
        if (parseUrl.pathname == '/') {
            fs.readFile('./index.html', (err, content) => {
                if (err) return res.end(err);
                res.setHeader('content-type', 'text/html');
                res.end(content);
            });
        } else if (parseUrl.pathname == '/about') {
            fs.readFile('./about.html', (err, content) => {
                if (err) return res.end(err);
                res.setHeader('content-type', 'text/html');
                res.end(content);
            });
        } else if (parseUrl.pathname == '/project') {
            fs.readFile('./project.html', (err, content) => {
                if (err) return res.end(err);
                res.setHeader('content-type', 'text/html');
                res.end(content);
            });
        } else if (parseUrl.pathname == '/stream') {
            // when url url match with /steram './node.pdf' file is steraming
            fs.createReadStream('./node.pdf', { bufferSize: 64 * 1024 }).pipe(res);

        } else {
            fs.readFile('./404.html', (err, content) => {
                if (err) return res.end(err);
                res.setHeader('content-type', 'text/html');
                res.end(content);
            });
        }
    };
}

