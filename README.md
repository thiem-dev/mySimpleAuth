# mySimpleAuth

basic auth

# CORS issues

-if having CORS issue, inside authRoutes.js set cors origin to the front end that your users are logging into. You can't use `app.use(cors())` anymore, browsers for security reasons block credentials from being sent to origins that weren't expecting each other.
