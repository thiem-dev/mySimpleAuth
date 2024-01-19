const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../db')
const router = express.Router()
const jwtGenerator = require('../utils/jwtGenerator')

router.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body

        //check if user already exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email])
        if(user.rows.length !== 0){
            res.status(402).send('user alerady exists')
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const bcryptPasswWord = await bcrypt.hash(password, salt)

        const newUser = await pool.query(`INSERT INTO users(user_name, user_email, user_password) 
            VALUES($1, $2, $3) RETURNING *`, [name, email, bcryptPasswWord])

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})


    } catch (error){
        console.log(error.message)
        res.status(500).send('server errorr...')
    }
});

module.exports = router