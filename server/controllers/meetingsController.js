const connection = require('../config/db');
const {
    validationResult
} = require('express-validator');
const utils = require('../utils/utils');

exports.createMeeting = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, description, day, beginTime, endTime, host, guests } = req.body;

    try {
        
        connection.query('INSERT INTO meetings (name, description, day, beginTime, endTime, host) VALUES (?, ?, ?, ?, ?, ?)', [name, description, day, beginTime, endTime, host], function (err, result) {
            if (err) throw err;
            const guestsQuery = utils.buildGuestsQuery(guests, result.insertId);
            connection.query(guestsQuery, function (err, results) {
                res.status(200).json({
                    id: result.insertId,
                    name,
                    description,
                    day,
                    beginTime,
                    endTime,
                    host
                });
            });
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }

}

exports.getMeetingsByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        connection.query("SELECT idMeeting, accepted FROM guests WHERE idUser = ?", [userId], async function (err, result) {
            if (err) throw err;
            res.status(200).json({
                meetings: result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

exports.getGuestsByMeeting = async (req, res) => {
    try {
        const meetingId = req.params.id;
        connection.query("SELECT idUser, accepted FROM guests WHERE idMeeting = ?", [meetingId], async function (err, result) {
            if (err) throw err;
            res.status(200).json({
                guests: result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

exports.updateInvitation = async (req, res) => {
    try {
        const meetingId = req.params.id;
        const userId = req.user.id;
        connection.query("UPDATE guests SET accepted = ? WHERE idMeeting = ? AND idUser = ?", [req.body.accepted, meetingId, userId], async function (err) {
            if (err) throw err;
            res.status(200).json({
                msg: `User ${userId} updated its invitation at meeting ${meetingId}`
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

exports.addGuest = async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const userId = req.params.userId;
        connection.query("INSERT INTO guests (idMeeting, idUser) VALUES (?, ?)", [meetingId, userId], async function (err) {
            if (err) throw err;
            res.status(200).json({
                msg: `User ${userId} added to meeting ${meetingId}`
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}

exports.deleteGuest = async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const userId = req.params.userId;
        connection.query("DELETE FROM guests WHERE idMeeting = ? AND idUser = ?", [meetingId, userId], async function (err) {
            if (err) throw err;
            res.status(200).json({
                msg: `User ${userId} deleted from meeting ${meetingId}`
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}