const fs = require('fs');
const path = require('path');
const http = require('http');

// Define the path to the USB drive and the file you're looking for
const usbDrivePath = 'D:/'; 
const fileName = '.run_code(ydh3297eyxou)'; // The specific file to check
const filePath = path.join(usbDrivePath, fileName);

// Function to check if the file exists and handle errors
function checkUSB(callback) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            callback(false); // USB file not found
        } else {
            callback(true); // USB file found
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url === '/styles.css') {
        fs.readFile('./styles.css', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            }
        });
    } else if (req.url === '/status') {
        checkUSB((usbDetected) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ usbDetected }));
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
