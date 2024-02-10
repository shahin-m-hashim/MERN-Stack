const userController = async (req, res) => {
  console.log("Inside user controller");
  const { userId, username } = req.user;

  if (req.user) {
    res
      .status(200)
      .send(`Successfully logged in as user ${userId}\nWelcome ${username}`);
  } else {
    res.status(401).send({ status: false, error: "Invalid Credentials" });
  }
};

module.exports = userController;
