const pool = require('../db.js');
const { hashPassword, comparePassword } = require('../utils/auth.js');
const jwtGenerator = require('../utils/jwtGenerator.js');
const jwt = require('jsonwebtoken');

// dev test endpoint
const test = (req, res) => {
  res.json('test working');
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //name check
    if (!name) {
      return res.json({
        error: 'name is required',
      });
    }

    //email check
    if (!email) {
      return res.json({
        error: 'email is required',
      });
    }

    //password check
    if (!password || password.length < 6) {
      return res.json({
        error: 'password is required and should be at least 6 characters long',
      });
    }

    //check email
    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1;',
      [email]
    );
    if (user.rows.length !== 0) {
      return res.json({
        error: 'Email was taken',
      });
    }

    //create new user
    const hashedPw = await hashPassword(password);
    const newUser = await pool.query(
      `INSERT INTO users(user_name, user_email, user_password) 
    VALUES($1, $2, $3) RETURNING *`,
      [name, email, hashedPw]
    );

    return res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await pool.query(
      `SELECT * FROM users WHERE user_email = $1; `,
      [email]
    );
    if (user.rows.length === 0) {
      return res.json({ error: 'email does not exist' });
    }

    //compare passwords
    const match = await comparePassword(password, user.rows[0].user_password);
    if (match) {
      const payload = {
        user: {
          id: user.rows[0].user_id,
        },
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: 'passwords do not match',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
