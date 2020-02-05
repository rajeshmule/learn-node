const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer();

server.on('request', (req, res) => {
    let store = '';
    req.on('data', (chank) => {
        store += chank;
    });
    req.on('end', () => {

        if (req.url === '/users' && req.method === 'GET') {
            fs.readFile('./index.html', (err, content) => {
                if (err) return res.end(err);
                res.setHeader('content-type', 'text/html');
                res.end(content);
            });
        } else if (req.url == '/users' && req.method === 'POST') {
            const data = JSON.stringify(querystring.parse(store));
            const user = JSON.parse(data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>hello ${user.name}.</h1><br /><br />To create user please enter: ` + `<a href="${req.url}">click here</a>`);
            res.end();
            // res.end(data);

        }

    })
});

server.listen(3000);