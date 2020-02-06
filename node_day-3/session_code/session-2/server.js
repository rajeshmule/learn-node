// CURD with fs

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const usersPath = path.join(__dirname, 'users/');

// const usersPath1 = __dirname + /users/;
// console.log(usersPath, "\n", usersPath1);

const server = http.createServer();

server.on('request', (req, res) => {
    let parseUrl = url.parse(req.url, true);
    let store = '';
    req.on('data', (chank) => {
        store += chank;
    });

    req.on('end', () => {


        if (parseUrl.pathname === '/users' && req.method === 'POST') {
            const name = JSON.parse(store).name;
            // create Json file new file

            fs.open(usersPath + name + '.json', 'wx', (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.error('myfile already exists');
                        return;
                    }
                    throw err;
                }
                fs.writeFile(fd, store, (err) => {
                    if (err) return res.end(err);
                    fs.close(fd, (err) => {
                        if (err) return res.end(err);
                        res.end(`${name} created successfully`);
                    })
                })
            })
        }
        else if (parseUrl.pathname === '/users' && req.method === 'GET') {

            const name = parseUrl.query.name;

            if (fs.existsSync(usersPath + name + '.json')) {
                fs.readFile(usersPath + name + '.json', (err, fd) => {
                    if (err) return res.end(err);
                    res.end(fd);
                })
            } else {
                res.end('not exists.');
            }
        } else if (parseUrl.pathname === '/users' && req.method === 'PUT') {

            const name = parseUrl.query.name;
            fs.open(usersPath + name + '.json', 'r+', (err, fd) => {
                if (err) return res.end(err);
                fs.ftruncate(fd, (err) => {
                    if (err) return res.end(err);
                    fs.writeFile(fd, store, (err) => {
                        if (err) return res.end(err);
                        fs.close(fd, (err) => {
                            if (err) return res.end(err);
                            res.end(`${name} successfully update`);
                        })
                    })
                })

            })
        } else if (parseUrl.pathname === '/users' && req.method === 'DELETE') {
            const name = parseUrl.query.name;
            fs.unlink(usersPath + name + '.json', (err) => {
                if (err) throw err;
                res.end("file deleted");
            });
        }
    })
});

server.listen(3000);
