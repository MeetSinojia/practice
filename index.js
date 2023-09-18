const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.raw({ type: '*/*' }));

app.post('/uploadCode', (req, res) => {
  const {
    Name,
    Email,
    CollegeName,
    StudentId,
    FileName
  } = req.headers;

  if (!(Name && Email && CollegeName && StudentId && FileName)) {
    return res.status(400).send('Missing mandatory headers');
  }

  // Validate file extension
  const fileExtension = FileName.split('.').pop();
  if (fileExtension !== 'py') {
    return res.status(400).send('Invalid file extension. Please upload a Python file with .py extension.');
  }

  const filePath = `${StudentId}_${FileName}`;

  fs.writeFile(filePath, req.body, (err) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    return res.status(200).send('Code uploaded successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
