const userDoc = require("../database/models/userModel");
const handleDbErrors = require("../utils/handleDbErrors");

const signUpUser = async (userData) => {
  try {
    return await userDoc.create(userData);
  } catch (e) {
    return handleDbErrors(e);
  }
};

module.exports = signUpUser;
