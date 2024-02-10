const users = require("../database/models/userModel");

const getUser = async (userId) => {
  console.log("Inside user service");
  try {
    const user = await users.findById(userId, "-password");
    return user;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

module.exports = getUser;
