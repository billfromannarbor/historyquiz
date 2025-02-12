const fs = require('fs');
const path = require('path');

const segmentsDir = path.join(__dirname, 'segments');
const outputFilePath = path.join(__dirname, 'segments.json');

fs.readdir(segmentsDir, (err, files) => {
    if (err) {
        console.error('Error reading segments directory:', err);
        return;
    }

    const segments = [];

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(segmentsDir, file);
            const data = fs.readFileSync(filePath, 'utf8');
            try {
                const segment = JSON.parse(data);
                segments.push(segment);
            } catch (parseErr) {
                console.error('Error parsing JSON file:', file, parseErr);
            }
        }
    });

    fs.writeFile(outputFilePath, JSON.stringify(segments, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing segments.json:', writeErr);
        } else {
            console.log('segments.json has been created successfully.');
        }
    });
});
