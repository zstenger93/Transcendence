const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Read the content of index.html file
    fs.readFile('public/index.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// Listen on port 8080
server.listen(8080, '0.0.0.0', () => {
    console.log('Server running on http://localhost:8080/');
});