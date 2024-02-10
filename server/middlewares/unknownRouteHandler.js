const unknownRouteHandler = (req, res) => {
  console.log("Unknown Route Handling Middleware");
  res.status(404).json({
    success: false,
    error: "Page Doesn't Exist",
  });
};

module.exports = unknownRouteHandler;
