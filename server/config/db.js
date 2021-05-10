var mysql = require('mysql');
require('dotenv').config({ path: '.env'});

const connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : 'santander_meetings'
        });

module.exports = connection;
