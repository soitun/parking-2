const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: true
  },

  lat: {
    type: Number
  },

  lng: {
    type: Number
  },

  price: {
    type: Number
  },

  startTime: {
    type: String
  },

  endTime: {
    type: String
  },

  booked: {
    type: Boolean
  }
});

mongoose.model("parkingspots", parkingSpotSchema);
