const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// Route: api/users

router.post('/', 
    [
        check('username', 'Username is mandatory').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password length must be higher than 6 characters').isLength({min: 6})
    ]
    ,
    usersController.createUser
);

router.get('/', 
    auth,
    usersController.getAllUsers
);

module.exports = router;