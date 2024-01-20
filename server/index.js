//index.js
const express = require('express');
require('dotenv').config;
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Listening  on port: ${PORT}`);
});
