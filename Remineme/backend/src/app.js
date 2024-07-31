// In app.js
const express = require('express');
const app = express();
const routes = require('./routes/index.js'); // Assuming you have a routes/index.js file

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Route setup
app.use('/api', routes); // Assuming you have a centralized routes file

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
