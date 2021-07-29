// dotenv must implemented on top cause jwt-auth-helper depends on process.envy
require('dotenv').config();
const { JWT } = require('jwt-auth-helper');

const authenticate = async (req, res, next) => {
    try {
        // If give no parameter , it takes process.env.JWT_SECRET_KEY by default
        const jwt = new JWT();
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token?.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verifyToken(token);
            req.userId = decodedData?.id;
        }
        if (!req.userId) return res.status(401).json({ message: "Unauthorized." });

        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = authenticate;