const express = require('express');
const meetingsController = require('../controllers/meetingsController');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// Route: api/users

router.post('/',
    auth,
    [
        check('name', 'The name of the meeting cannot be empty').not().isEmpty(),
        check('description', 'The description of the meeting cannot be empty').not().isEmpty(),
        check('day', 'The day must have a date format').matches(new RegExp('^(0[1-9]|[12][0-9]|3[01])[- /.]')),
        check('beginTime', 'The day must have a time format').matches(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        check('endTime', 'The day must have a time format').matches(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        check('host', 'The host of the meeting cannot be empty').not().isEmpty(),
        check('guests', 'Guests must be an array').isArray(),

    ]
    ,
    meetingsController.createMeeting
);

router.get('/user/:id', 
    auth,
    meetingsController.getMeetingsByUser
);

router.post('/guests/:meetingId/:userId', 
    auth,
    meetingsController.addGuest
);

router.get('/guests/:id', 
    auth,
    meetingsController.getGuestsByMeeting
);

router.put('/guests/:id', 
    auth,
    meetingsController.updateInvitation
);

router.delete('/guests/:meetingId/:userId', 
    auth,
    meetingsController.deleteGuest
);



module.exports = router;