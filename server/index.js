const express = require('express');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
// app.use(cors());
app.use(express.json());
app.use('/', require('./routes/authRoutes'));

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
