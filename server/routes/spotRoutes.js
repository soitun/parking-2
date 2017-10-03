const mongoose = require("mongoose");
const ParkingSpot = mongoose.model("parkingspots");

module.exports = app => {
  app.post("/api/create_listing", (req, res, next) => {
    const { address, lat, lng, price, startTime, endTime } = req.body;

    // We use ES6's enhanced object literals to avoid repeating the
    // same key-value pairs, i.e. address: address
    const newSpot = new ParkingSpot({
      user: req.user._id,
      address,
      lat,
      lng,
      price,
      startTime,
      endTime,
      booked: false
    });

    newSpot.save(err => {
      if (err) {
        next(err);
        return;
      }

      res.send(newSpot);
    });
  });

  app.get("/api/listings", (req, res, next) => {
    ParkingSpot.find({}, (err, allSpots) => {
      if (err) {
        next(err);
        return;
      }

      res.send(allSpots);
    });
  });
};
