const express = require('express')
const pool = require('./db')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001


app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is working at /')
})

app.listen(PORT, () => {
    console.log(`Listening  on port: ${PORT}`)
})