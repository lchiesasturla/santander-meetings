const connection = require('../config/db');
const {
    validationResult
} = require('express-validator');
const utils = require('../utils/utils');
const emailController = require('./mailController');

exports.createMeeting = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        description,
        date,
        beginTime,
        endTime,
        guests
    } = req.body;

    try {

        connection.query('INSERT INTO meetings (name, description, date, beginTime, endTime, host) VALUES (?, ?, ?, ?, ?, ?)', [name, description, date, beginTime, endTime, req.user.id], function (err, result) {
            if (err) throw err;
            guests.push({
                id: req.user.id
            });
            const guestsQuery = utils.buildGuestsQuery(guests, result.insertId);
            connection.query(guestsQuery, function (err, results) {
                res.status(200).json({
                    id: result.insertId,
                    name,
                    description,
                    date,
                    beginTime,
                    endTime,
                    host: req.user.id
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }

}

exports.getMeetingsByUser = async (req, res) => {
    try {
        const date = new Date().toISOString().substr(0, 10);
        connection.query("SELECT m.*,idUser, accepted FROM guests g INNER JOIN meetings m ON g.idMeeting = m.id WHERE (g.idUser = ? OR m.host = ?) AND m.date >= ? GROUP BY m.id", [req.user.id, req.user.id, date], function (err, result) {
            if (err) throw err;
            res.status(200).json({
                meetings: result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }
}

exports.getMeeting = async (req, res) => {
    try {
        const meetingId = req.params.id;
        connection.query("SELECT * FROM meetings WHERE id = ?", [meetingId], function (err, meeting) {
            if (err) throw err;
            connection.query("SELECT u.id, u.username, u.email FROM guests g INNER JOIN users u ON g.idUser = u.id WHERE idMeeting = ?", [meetingId], function (err, guests) {
                if (err) throw err;
                connection.query("SELECT id, username, email FROM users WHERE id NOT IN (SELECT idUser FROM guests WHERE idMeeting = ?) AND id != ?", [meetingId, req.user.id], function (err, users) {
                    if (err) throw err;
                    guests = guests.filter(guest => guest.id !== req.user.id);
                    res.status(200).json({
                        meeting: meeting[0],
                        guests,
                        users
                    });
                });
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }
}

exports.updateInvitation = async (req, res) => {
    try {
        const meetingId = req.params.id;
        if (req.body.accepted === 1) {
            connection.query("UPDATE guests SET accepted = ? WHERE idMeeting = ? AND idUser = ?", [req.body.accepted, meetingId, req.user.id], function (err) {
                if (err) throw err;
                res.status(200).json({
                    msg_es: 'Invitacion aceptada correctamente!',
                    msg_en: 'Invitation accepted successfully!'
                });
            });
        } else {
            connection.query("DELETE FROM guests WHERE idMeeting = ? AND idUser = ?", [meetingId, req.user.id], function (err) {
                if (err) throw err;
                res.status(200).json({
                    msg_es: 'Invitacion rechazada correctamente!',
                    msg_en: 'Invitation rejected successfully!'
                });
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }
}

exports.addGuest = async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const userId = req.params.userId;
        connection.query("SELECT * FROM guests WHERE idMeeting = ? AND idUser = ?", [meetingId, userId], function (err, result) {
            if (err) throw err;

            if (result.length < 1) {
                connection.query("INSERT INTO guests (idMeeting, idUser) VALUES (?, ?)", [meetingId, userId], function (err) {
                    if (err) throw err;
                    connection.query("SELECT username, email FROM users WHERE id = ?", [userId], function (err, result) {
                        if (err) throw err;
                        emailController.sendInvitationEmail(result[0].username, result[0].email, meetingId);
                        res.status(200).json({
                            msg_es: `El usuario ${result[0].username} fue añadido a la meeting.`,
                            msg_en: `User ${result[0].username} added to meeting.`
                        });
                    });
                });
            } else {
                res.status(400).json({
                    msg_es: `El Usuario ${userId} ya esta invitado a la meeting.`,
                    msg_en: `User ${userId} is already invited to meeting.`
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }
}

exports.deleteGuest = async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const userId = req.params.userId;
        connection.query("SELECT * FROM guests WHERE idMeeting = ? AND idUser = ?", [meetingId, userId], function (err, result) {
            if (err) throw err;
            if (result.length === 1) {
                connection.query("DELETE FROM guests WHERE idMeeting = ? AND idUser = ?", [meetingId, userId], function (err) {
                    if (err) throw err;
                    connection.query("SELECT username, email FROM users WHERE id = ?", [userId], function (err, user) {
                        connection.query("SELECT name FROM meetings WHERE id = ?", [meetingId], function (err, meeting) {
                            emailController.sendCancelledEmail(user[0].username, user[0].email, meeting[0].name);
                            res.status(200).json({
                                msg_es: `El Usuario ${user[0].username} fue eliminado de la meeting.`,
                                msg_en: `User ${user[0].username} deleted from meeting.`
                            });
                        });
                    });
                });
            } else {
                res.status(400).json({
                    msg_es: `El Usuario ${userId} no esta invitado a la meeting.`,
                    msg_en: `User ${userId} isn't invited to meeting.`
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg_es: 'Hubo un error en el servidor.',
            msg_en: 'There was an error in the server.'
        });
    }
}