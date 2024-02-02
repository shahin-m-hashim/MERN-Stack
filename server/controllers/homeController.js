const controller = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to Home Page"
    });
}

module.exports = controller;