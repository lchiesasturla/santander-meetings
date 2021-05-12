const connection = require('../config/db');
const bcryptjs = require('bcryptjs');
const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { username, email, password } = req.body;

    try {
        connection.query("SELECT username FROM users WHERE email = ? or username = ?", [email, username], async function (err, result) {
            if (err) throw err;
            const user = result[0];
            if (user) {
                return res.status(400).json({
                    msg_es: 'El usuario ingresado ya existe.',
                    msg_en: 'User already exists.'
                });
            }

            const salt = await bcryptjs.genSalt();
            const passwordEncrypted = await bcryptjs.hash(password, salt);
            connection.query("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, passwordEncrypted], async function (err, result) {
                if (err) throw err;
                const payload = {
                    user: {
                        id: result.insertId
                    }
                };

                jwt.sign(payload, process.env.SECRET_WORD, {
                    expiresIn: 3600
                }, (error, token) => {
                    if (error) throw error;

                    res.status(200).json({
                        token
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

exports.getAllUsers = async (req, res) => {
    try {
        connection.query("SELECT id, username, email FROM users", async function (err, result) {
            if (err) throw err;
            res.json({
                users: result
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