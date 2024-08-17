const fs = require('fs');
const path = require('path');

// Define the path to the USB drive and the file you're looking for 
const usbDrivePath = 'D:/'; 
const fileName = '.run_code(ydh3297eyxou)'; // The specific file to check

// Construct the full path to the file
const filePath = path.join(usbDrivePath, fileName);

console.log(`Checking for file at: ${filePath}`);

// Function to check if the file exists and handle errors
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        // Handle file not found error
        if (err.code === 'ENOENT') {
            console.error('Error: The file does not exist at the specified path.');
        } else {
            // Handle other errors
            console.error(`Error accessing file: ${err.message}`);
        }
    } else {
        // File exists
        console.log('File exists, launching the game...');
        launch();
    }
});

// Function to be called when the file is found
function launch() {
    console.log("Game has started");
    // Add your game code here
}

// Additional error handling for path construction
try {
    const checkPath = path.join(usbDrivePath, fileName);
    console.log(`Constructed path: ${checkPath}`);
} catch (err) {
    console.error(`Error constructing path: ${err.message}`);
}

// Additional check to ensure the directory exists
fs.access(usbDrivePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('Error: The USB drive is not accessible or does not exist.');
    } else {
        console.log('USB drive is accessible.');
    }
});
