// middleware/authenticate.js

const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-auth-token']; // Extract API key from request header

    if (!apiKey || apiKey !== process.env.API_KEY) {
        // If no API key or incorrect API key is provided, return 403 Forbidden
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }

    // If the API key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = authenticate;
