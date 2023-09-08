const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ msg: 'Authentication failed: missing token' });
    }

    const token = header.substring(7);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(err);
        }

        next();
    })
};

module.exports = authenticateJwt;