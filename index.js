const express = require('express');
const multer  = require('multer');
const fs = require('fs');

const app = express();

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Define a route to handle file uploads
app.post('/upload_code', upload.single('codeFile'), (req, res) => {
    const { YourName, Email, CollegeName, StudentId, FileName } = req.headers;

    // Check if the uploaded file is not a txt file
    if (req.file && !req.file.originalname.endsWith('.txt')) {
        const filePath = req.file.path;
        
        // Process the uploaded file (e.g., save it to a specific location)
        // Example: fs.renameSync(filePath, 'desired_location/' + FileName);

        // Respond with success message or any additional processing
        res.json({ success: true });
    } else {
        // Delete the uploaded file (if needed)
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(400).json({ error: "Please don't upload txt files" });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
