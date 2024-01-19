const pg = require('pg')

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING=
})

module.exports = pool;