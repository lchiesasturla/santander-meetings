const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// Route: api/users

router.post('/', 
    [
        check('username', {
            msg_es: 'El nombre de usuario no puede estar vacio.',
            msg_en: 'Username cannot be empty.'
        }).not().isEmpty(),
        check('email', {
            msg_es: 'El mail debe ser un mail valido.',
            msg_en: 'Mail must be a valid email.'
        }).isEmail(),
        check('password', {
            msg_es: 'La longitud de la contraseña debe ser mayor a 6 caracteres.',
            msg_en: 'Password length must be higher than 6 characters.'
        }).isLength({min: 6})
    ]
    ,
    usersController.createUser
);

router.get('/', 
    auth,
    usersController.getAllUsers
);

module.exports = router;