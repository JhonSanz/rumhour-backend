
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


let checkAuthentication = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token provided'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = {
    checkAuthentication
}
