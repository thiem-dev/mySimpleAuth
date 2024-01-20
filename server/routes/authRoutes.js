const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../utils/corsOptions');
const {
  test,
  registerUser,
  loginUser,
} = require('../controllers/authController');

// middleware
router.use(cors(corsOptions));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);

// Error handling middleware (comes after route definitions)
router.use((err, req, res, next) => {
  if (err) {
    if (err.status === 403) {
      // CORS error
      res.status(403).json({ error: 'CORS not allowed' });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
