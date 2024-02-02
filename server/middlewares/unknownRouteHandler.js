const unknownRouteHandler = (req, res) => {
    console.error("Page Doesn't Exist");
    res.status(404).json({
        success: false,
        error: "Page Doesn't Exist"
    });
}

module.exports = unknownRouteHandler;