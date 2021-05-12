const emailController = require('../controllers/mailController');

exports.buildGuestsQuery = (guests, idMeeting) => {
    let query = 'INSERT INTO guests (idUser, idMeeting) VALUES ';
    guests.map(guest => {
        query += `(${guest.id},${idMeeting}),`;
        if(guest.email)
            emailController.sendInvitationEmail(guest.username, guest.email, idMeeting);
    })
    return query.substr(0, query.length - 1);
}