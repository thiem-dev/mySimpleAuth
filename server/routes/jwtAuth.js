const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../db')
const router = express.Router()

router.post('/register', async (req, res) => {
    res.send('working in register')
});

module.exports = router