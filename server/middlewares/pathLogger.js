const logger = (req, res, next) => {
    console.log("Client has requested path:", req.path);
    next();
}

module.exports = logger