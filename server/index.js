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
  });
//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/meetings', require('./routes/meetings'));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
});