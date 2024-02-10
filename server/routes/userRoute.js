const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/user", userController);

module.exports = router;
