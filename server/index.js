const express = require('express');
const dotenv = require('dotenv').config;
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', require('./routes/jwtAuth'));
app.use('/api/admin', require('./routes/admin'));

// app.get('/api/users', async (req, res) => {
//     try{
//         const users = await pool.query('SELECT * FROM users;')
//         res.send(users.rows)
//     } catch (error){
//         res.status(500).send('Server Error')
//     }
// })

app.listen(PORT, () => {
  console.log(`Listening  on port: ${PORT}`);
});