const bcrypt = require('bcrypt');
const userDoc = require("../database/models/userModel");
const dbErrorHandler = require("../utils/handleDbErrors");
const createToken = require('../utils/createToken');

const authenticateUser = async (searchQuery, password) => {
    try {
        const user = await userDoc.findOne(searchQuery);
        if (user) {
            const isUserAuthentic = await bcrypt.compare(password, user.password);
            console.log("Is User Authentic ?", isUserAuthentic);
            return isUserAuthentic ? createToken(user.id) : false // handle invalid password 
        }
        return false; // or handle invalid user
    } catch (e) {
        return dbErrorHandler(e);
    }
};

module.exports = authenticateUser;
