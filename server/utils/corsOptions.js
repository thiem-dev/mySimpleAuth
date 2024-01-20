const allowedOrigins = [
  'http://localhost:5173',
  'https://example.com',
  'http://another-origin.com',
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow the request if it matches one of the allowed origins or if there is no origin (e.g., same-origin requests)
      callback(null, true);
    } else {
      // Block the request if the origin is not in the whitelist
      const error = new Error(
        'Not allowed by CORS. Origin was not on whitelist'
      );
      error.status = 403; // Set the HTTP status code for forbidden
      callback(error);
    }
  },
};

module.exports = corsOptions;
