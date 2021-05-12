const express = require('express');
const meetingsController = require('../controllers/meetingsController');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// Route: api/meetings

router.post('/',
    auth,
    [
        check('name', {
            msg_es: 'El nombre de la meeting no puede estar vacio.',
            msg_en: 'The name of the meeting cannot be empty.'
        }).not().isEmpty(),
        check('description', {
            msg_es: 'La descripcion de la meeting no puede estar vacia.',
            msg_en: 'The description of the meeting cannot be empty.',
        }).not().isEmpty(),
        // check('day', {
        //     msg_es: 'El dia debe tener formato de fecha dd/mm/yyyy.',
        //     msg_en: 'Day must have date format dd/mm/yyyy.',
        // }).matches(new RegExp('^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$')),
        check('beginTime', {
            msg_es: 'La hora de inicio debe tener formato de hora hh:mm.',
            msg_en: 'Begin time must have time format hh:mm.',
        }).matches(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        check('endTime', {
            msg_es: 'La hora de fin debe tener formato de hora hh:mm.',
            msg_en: 'End time must have time format hh:mm.',
        }).matches(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        check('host', {
            msg_es: 'El creador de la meeting no puede estar vacio.',
            msg_en: 'The host of the meeting cannot be empty.'
        }).not().isEmpty(),
        check('guests', {
            msg_es: 'Los invitados deben ser un array.',
            msg_en: 'Guests must be an array.'
        }).isArray(),

    ]
    ,
    meetingsController.createMeeting
);

router.get('/user', 
    auth,
    meetingsController.getMeetingsByUser
);

router.post('/guests/:meetingId/:userId', 
    auth,
    meetingsController.addGuest
);

router.get('/:id', 
    auth,
    meetingsController.getMeeting
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