const verifyAdmin = (req, res, next) => {
  const role = req.headers["x-role"];

  if (role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required"
  });
};

module.exports = verifyAdmin;