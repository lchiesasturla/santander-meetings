const express = require('express');
const cors = require('cors');
const connection = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json({extended: true}));
const PORT = process.env.PORT || 4000;
connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    connection.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(45) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)", function (err, result) {
      if (err) throw err;
      console.log("If not exists, table of users created");
      connection.query("CREATE TABLE IF NOT EXISTS meetings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(45) NOT NULL, description VARCHAR(100) NOT NULL, date VARCHAR(10) NOT NULL, beginTime VARCHAR(5) NOT NULL, endTime VARCHAR(5) NOT NULL, host INT NOT NULL)", function (err, result) {
        if (err) throw err;
        console.log("If not exists, table of meetings created");
        connection.query("CREATE TABLE IF NOT EXISTS guests (idMeeting INT, idUser INT, accepted TINYINT, PRIMARY KEY (idMeeting, idUser), FOREIGN KEY (idMeeting) REFERENCES meetings(id), FOREIGN KEY (idUser) REFERENCES users(id))", function (err, result) {
          if (err) throw err;
          console.log("If not exists, table of guests created");
        });
      });
    });
  });

  
//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/meetings', require('./routes/meetings'));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
});