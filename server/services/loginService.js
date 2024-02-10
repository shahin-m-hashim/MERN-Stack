const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDoc = require("../database/models/userModel");
const dbErrorHandler = require("../utils/handleDbErrors");

const authenticateUser = async (email, password) => {
  // console.log("Inside login service");

  try {
    const user = await userDoc.findOne({ email });

    if (user) {
      const isUserAuthentic = await bcrypt.compare(password, user.password);
      console.log("Is User Authentic ?", isUserAuthentic);

      if (isUserAuthentic) {
        const { id, username } = user;

        const token = jwt.sign(
          { userId: id, username },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1hr",
          }
        );

        return token;
      } else return false; // handle invalid password
    }

    return false; // or handle invalid user
  } catch (e) {
    return dbErrorHandler(e);
  }
};

module.exports = authenticateUser;
