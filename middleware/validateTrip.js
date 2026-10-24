
const validateTrip = (req, res, next) => {
  const { destination, country, cost } = req.body || {};

  if (
    typeof destination !== "string" ||
    destination.trim() === "" ||
    typeof country !== "string" ||
    country.trim() === "" ||
    typeof cost !== "number" ||
    !Number.isFinite(cost) ||
    cost <= 0
  ) {
    return res.status(400).json({
      message: "Valid destination, country and cost are required"
    });
  }

  next();
};

module.exports = validateTrip;