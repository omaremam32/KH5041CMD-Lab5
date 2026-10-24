
const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  compareTrips
} = require("../controllers/tripController");

const verifyAdmin = require("../middleware/verifyAdmin");
const validateTrip = require("../middleware/validateTrip");
const logRequest = require("../middleware/logRequest");

// Log all trips requests
router.use(logRequest);

// Public routes
router.get("/", getAllTrips);
router.post("/compare", compareTrips);
router.get("/:id", getTripById);

// Admin-only routes
router.post("/", verifyAdmin, validateTrip, createTrip);
router.put("/:id", verifyAdmin, updateTrip);
router.delete("/:id", verifyAdmin, deleteTrip);

module.exports = router;