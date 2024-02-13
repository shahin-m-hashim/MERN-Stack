const userController = async (req, res) => {
  console.log("Inside user controller");
  const { userId, username } = req.user;

  if (req.user) {
    return res.status(200).send({
      success: true,
      message: `Login successful, Welcome ${username}`,
      data: { userId, username },
    });
  } else {
    return res
      .status(401)
      .send({ success: false, error: "Invalid Credentials" });
  }
};

module.exports = userController;
