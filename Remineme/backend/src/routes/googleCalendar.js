const express = require('express');
const router = express.Router();
const googleCalendarController = require('../../controllers/googleCalendarController');
const auth = require('../../middleware/auth');

router.get('/events', auth, googleCalendarController.getGoogleCalendarEvents);
router.post('/events/import', auth, googleCalendarController.importGoogleCalendarEvents);

module.exports = router;
