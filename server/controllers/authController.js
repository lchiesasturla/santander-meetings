const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const connection = require('../config/db');

exports.login = async (req, res) => {

    try {
        const { username, password} = req.body;
        connection.query("SELECT * FROM users WHERE username = ?", [username], async function (err, result, fields) {
            if (err) throw err;
            let user = result[0];
            console.log('User: ', user);
            if (!user) {
                return res.status(400).json({
                    msg: 'User does not exist'
                });
            }

            const validPass = await bcryptjs.compare(password, user.password);
            if (!validPass) {
                return res.status(400).json({
                    msg: 'Username or password are incorrect'
                });
            }

            //Crear y firmar el JWT
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.SECRET_WORD, {
                expiresIn: 3600
            }, (error, token) => {
                if (error) throw error;

                res.status(200).json({token});
            });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'There was an error'});
    }

}


exports.getAuthenticatedUser = async (req, res) => {
    try {
        connection.query("SELECT id, username, email FROM users WHERE id = ?", [req.user.id], async function (err, result, fields) {
            if(err) throw err;
            res.json({
                user: result[0]
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}