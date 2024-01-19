const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../db')
const router = express.Router()
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')


router.get('/verify', authorization, async(req, res) => {
    try{
        res.json(true)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.post('/register', validInfo, async (req, res) => {
    try{
        const {name, email, password} = req.body

        //check if user already exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email])
        if(user.rows.length !== 0){
            res.status(402).send('user already exists')
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

router.post('/login', validInfo, async(req,res) => {
    try{
        const {email, password} = req.body

        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email])
        
        if(user.rows.length < 1){
            return res.status(404).send('User not found...')
        }

        //check if inc password is the same as the db password
        const validPassword = await bcrypt.compare(password, user,rows[0].user_password)

        if(!validPassword){
            return res.status(401).send('Name or email is wrong...')
        }

        //if valid, give jwt
        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})

    } catch (error){
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router