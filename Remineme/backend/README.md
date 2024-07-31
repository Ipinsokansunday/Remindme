## backend of the remindme app
Here's the directory structure for the backend:

lua
Copy code
backend/
├── config/
│   └── config.js
├── controllers/
│   ├── googleCalendarController.js
│   ├── reminderController.js
│   └── userController.js
├── middleware/
│   └── auth.js
├── migrations/
├── models/
│   ├── index.js
│   ├── reminder.js
│   └── user.js
├── routes/
│   ├── googleCalendar.js
│   ├── reminders.js
│   └── users.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
