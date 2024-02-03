const authenticateUser = require("../services/loginService");

const controller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authenticateUser({ email }, password);
        if (token) {
            res.cookie('jwt', token, {
                httpOnly: true, // prevent acceding the token via js browser console
                // secure: true,  in real world this should be enabled to enforce the token only in https
                // sameSite: 'Lax', 
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            });
            return res.status(200).json({
                success: true,
                message: "Login Successful"
            });
        }
        else {
            return res.status(401).json({
                success: false,
                error: "Invalid Credentials"
            });
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