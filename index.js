const http = require('http');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: './uploads' });

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        console.log('Request for Home Page');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Home Page');
    } else if (req.url === '/about') {
        console.log('Request for About Page');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is About Page');
    } else if (req.url === '/contact') {
        console.log('Request for Contact Page');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Contact Page');
    } else if (req.url === '/file-write') {
        console.log('Request for File Write');
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing file');
                return;
            }
            console.log('File created and text written successfully');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File created and text written successfully');
        });
    } else if (req.url === '/upload' && req.method === 'POST') {
        // Handle file upload
        upload.single('file')(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error uploading file');
                return;
            }
            console.log('File uploaded successfully');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded successfully');
        });
    } else {
        console.log('Invalid Request');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(5500, () => {
    console.log('Server is listening on port 5500');
});
