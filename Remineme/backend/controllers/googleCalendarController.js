const { google } = require('googleapis');
const { Reminder } = require('../models');
const { OAuth2 } = google.auth;

// Set up OAuth2 client
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// Function to set the OAuth2 credentials
const setCredentials = (tokens) => {
  oauth2Client.setCredentials(tokens);
};

// Retrieve events from Google Calendar
exports.getGoogleCalendarEvents = async (req, res) => {
  try {
    const tokens = req.user.googleTokens; // Assuming the user's Google tokens are stored in req.user
    setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const calendarId = 'primary';
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items.map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date
    }));

    res.json(events);
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    res.status(500).json({ error: 'Failed to fetch Google Calendar events' });
  }
};

// Import events from Google Calendar into RemindMe
exports.importGoogleCalendarEvents = async (req, res) => {
  const { calendarId } = req.body;

  try {
    const tokens = req.user.googleTokens; // Assuming the user's Google tokens are stored in req.user
    setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items;

    const reminders = await Promise.all(events.map(async event => {
      return Reminder.create({
        title: event.summary,
        description: event.description || '',
        date: event.start.dateTime || event.start.date,
        userId: req.user.id
      });
    }));

    res.status(201).json(reminders);
  } catch (error) {
    console.error('Error importing Google Calendar events:', error);
    res.status(500).json({ error: 'Failed to import Google Calendar events' });
  }
};

