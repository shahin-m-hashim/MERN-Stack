const signUpUser = require("../services/signupService");

const controller = async (req, res) => {
    try {
        const signupRes = req.body && await signUpUser(req.body);

        if (!signupRes.reason) {
            const { username, email, createdAt } = signupRes;

            return res.status(201).json({
                success: true,
                data: { username, email, createdAt },
                message: `User ${signupRes._id} signed up successfully`,
            })
        } else if (signupRes.type === 'Error' && signupRes.reason === 'VALIDATION(S)_FAILED') {
            return res.status(400).json({
                success: false,
                data: signupRes,
                message: 'Validations failed',
            })
        } else if (signupRes.type === 'Error' && signupRes.reason === 'ALREADY_EXISTS') {
            return res.status(409).json({
                success: false,
                data: signupRes,
                message: `User already registered`,
            })
        } else {
            console.log('Error:', signupRes)
            return res.status(400).json({
                success: false,
                data: signupRes,
                message: "User creation failed",
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