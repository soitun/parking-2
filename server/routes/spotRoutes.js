const mongoose = require("mongoose");
const ParkingSpot = mongoose.model("parkingspots");

module.exports = app => {
  app.post("/api/create_listing", (req, res, next) => {
    const { lat, lng, price, startTime, endTime } = req.body;

    const newSpot = new ParkingSpot({
      user: req.user._id,
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
};
