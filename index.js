const express = require('express');

const app = express();

// In-memory data store (for simplicity)
let data = [];

// POST route to add a name and email
app.post('/users', (req, res) => {
  const name = req.header('name');
  const email = req.header('email');
  data.push({ name, email });
  res.send('User added successfully');
});

// GET route to retrieve all names and emails
app.get('/users', (req, res) => {
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
