//index.js
const express = require('express');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use('/', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Listening  on port: ${PORT}`);
});
