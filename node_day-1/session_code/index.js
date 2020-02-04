var fs = require('fs');

fs.readFile('./abc.txt', (err, content) => {
    if (err) {
        console.log(err);
    }
    console.log(content.toString());
})

