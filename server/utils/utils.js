exports.buildGuestsQuery = (guests, idMeeting) => {
    let query = 'INSERT INTO guests (idUser, idMeeting) VALUES ';
    guests.map(guest => {
        query += `(${guest.id},${idMeeting}),`;
    })
    return query.substr(0, query.length - 1);
}