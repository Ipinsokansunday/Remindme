require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// Import routes
const reminderRoutes = require('./src/routes/reminders');
const userRoutes = require('./src/routes/users');
const googleCalendarRoutes = require('./src/routes/googleCalendar');

// Use routes
app.use('/api/reminders', reminderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/google/calendar', googleCalendarRoutes);

// Export app for testing
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
