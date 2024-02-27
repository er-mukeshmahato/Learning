const jwtToken = require('jsonwebtoken');
const JWT_SECRET = "ThisIsTestForJwtToken";

// Middleware to fetch user details from the JWT token
const fetchUserDetail = (req, res, next) => {
    // Get the user from the jwtToken and return the User ID

    // Retrieve the token from the request header
    const token = req.header('auth-token');

    // Check if the token is missing
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token and extract user data
        const data = jwtToken.verify(token, JWT_SECRET);

        // Attach user data to the request object for further use
        req.user = data.user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchUserDetail;
