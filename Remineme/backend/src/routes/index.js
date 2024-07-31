const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userController = require('../../controllers/userController');
const reminderController = require('../../controllers/reminderController');

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);

// Reminder routes
router.post('/reminders', auth, reminderController.createReminder);
router.get('/reminders', auth, reminderController.getAllReminders);
router.put('/reminders/:id', auth, reminderController.updateReminder);
router.delete('/reminders/:id', auth, reminderController.deleteReminder);

module.exports = router;
