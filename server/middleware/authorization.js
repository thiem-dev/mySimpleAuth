const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async(req,res,next) => {
    try{
        const jwtToken = req.header("token")

        if(!token){
            return res.status(403).send('nott authorized')
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret)

        req.user = payload.user
        next()
    } catch (error){
        console.error(error.message)
        return res.status(403).send('not authorized')
    }
}