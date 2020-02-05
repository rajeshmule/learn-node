// CURD

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
    let parseUrl = url.parse(req.url, true);
    req.on('end', () => {

        if (req.method === 'GET') {

        } else if (req.method === 'POST') {


        }

    })
});

server.listen(3000);