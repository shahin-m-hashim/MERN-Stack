const userDoc = require("../database/models/userModel");
const dbErrorHandler = require("../utils/dbErrorHandler");

const findUserByUsername = async username => {
    try {
        return await userDoc.findOne({ username })
    } catch (e) {
        return dbErrorHandler(e);
    }
};

const createUser = async userData => {
    try {
        return await userDoc.create(userData);
    } catch (e) {
        return dbErrorHandler(e);
    }
};

module.exports = { createUser, findUserByUsername };