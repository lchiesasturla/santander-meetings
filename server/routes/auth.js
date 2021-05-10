const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');

// Route: api/auth

router.post('/', 
    authController.login
);

router.get('/',
    auth,
    authController.getAuthenticatedUser
);

module.exports = router;