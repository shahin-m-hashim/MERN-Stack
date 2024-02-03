require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60
        // this jwt will be valid for 3 days (in sec) once its created
    });
};

module.exports = createToken;