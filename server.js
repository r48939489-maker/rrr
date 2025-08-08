const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'apk', 'signed.apk');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        res.download(filePath, 'signed.apk', (err) => {
            if (err) {
                console.error('Error downloading the file:', err);
                res.status(500).send('Could not download file');
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/download`);
});