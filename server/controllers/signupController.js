const { createUser, findUserByUsername } = require("../services/signupService");

const controller = async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            console.error("User with username", username, "already exists");
            return res.status(409).json({
                success: false,
                error: "User already exists"
            });
        } else {
            const userRes = await createUser(req.body);
            if (userRes.type !== 'Error') {
                console.log("User created successfully");
                res.status(201).json({
                    success: true,
                    data: userRes,
                    message: `User ${userRes._id} signed up successfully`,
                })
            } else {
                console.error("User creation failed");
                res.status(400).json({
                    success: false,
                    data: userRes,
                    error: "User creation failed",
                });
            }
        }
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = controller;