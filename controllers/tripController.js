
const trips = require("../models/Trip");

let nextTripId = Math.max(0, ...trips.map(trip => trip.id)) + 1;

// GET all trips
const getAllTrips = (req, res) => {
  return res.status(200).json(trips);
};

// GET a trip by ID
const getTripById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid trip ID"
    });
  }

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      return res.status(200).json(trips[i]);
    }
  }

  return res.status(404).json({
    message: "Trip not found"
  });
};

// POST create a new trip
// Input validation is handled by validateTrip middleware
const createTrip = (req, res) => {
  const { destination, country, cost } = req.body;

  const newTrip = {
    id: nextTripId,
    destination: destination.trim(),
    country: country.trim(),
    cost: cost
  };

  nextTripId++;

  trips.push(newTrip);

  return res.status(201).json(newTrip);
};

// PUT update an existing trip
const updateTrip = (req, res) => {
  const id = Number(req.params.id);
  const { destination } = req.body || {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid trip ID"
    });
  }

  if (
    typeof destination !== "string" ||
    destination.trim() === ""
  ) {
    return res.status(400).json({
      message: "Valid destination is required"
    });
  }

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      trips[i].destination = destination.trim();

      return res.status(200).json(trips[i]);
    }
  }

  return res.status(404).json({
    message: "Trip not found"
  });
};

// DELETE an existing trip
const deleteTrip = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid trip ID"
    });
  }

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      trips.splice(i, 1);

      return res.status(204).send();
    }
  }

  return res.status(404).json({
    message: "Trip not found"
  });
};

// POST compare two trips
const compareTrips = (req, res) => {
  const { tripId1, tripId2 } = req.body || {};

  // Validate trip IDs
  if (
    !Number.isInteger(tripId1) ||
    !Number.isInteger(tripId2) ||
    tripId1 <= 0 ||
    tripId2 <= 0 ||
    tripId1 === tripId2
  ) {
    return res.status(400).json({
      message: "Provide two different positive integer trip IDs"
    });
  }

  let trip1 = null;
  let trip2 = null;

  // Find both trips
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === tripId1) {
      trip1 = trips[i];
    }

    if (trips[i].id === tripId2) {
      trip2 = trips[i];
    }
  }

  // Check whether both trips exist
  if (!trip1 || !trip2) {
    return res.status(404).json({
      message: "One or both trips not found"
    });
  }

  // Calculate cost difference
  const costDifference = Math.abs(trip1.cost - trip2.cost);

  // Equal costs
  if (trip1.cost === trip2.cost) {
    return res.status(200).json({
      destination1: trip1.destination,
      destination2: trip2.destination,
      costDifference: costDifference,
      message: "Neither trip is cheaper"
    });
  }

  // Find cheaper destination
  const cheaperDestination =
    trip1.cost < trip2.cost
      ? trip1.destination
      : trip2.destination;

  return res.status(200).json({
    destination1: trip1.destination,
    destination2: trip2.destination,
    costDifference: costDifference,
    cheaperDestination: cheaperDestination
  });
};

// Export controller functions
module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  compareTrips
};