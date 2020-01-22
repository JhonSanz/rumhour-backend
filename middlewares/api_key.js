const dotenv = require('dotenv');
dotenv.config();

/**
 * Checks if API_KEY headers match with backend API_KEY
 */
let verifyApiKey = (req, res, next) => {
    if (req.header("API_KEY") != process.env.API_KEY) {
        return res.status(403).json({ error: "Invalid API_KEY" })
    }
    next();
};

module.exports = {
    verifyApiKey
}
