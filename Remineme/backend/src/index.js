require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('../models'); // Adjust path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Import routes
const reminderRoutes = require('./routes/reminders');
const userRoutes = require('./routes/users');
const googleCalendarRoutes = require('./routes/googleCalendar');

// Use routes
app.use('/api/reminders', reminderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/google/calendar', googleCalendarRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

module.exports = app;
