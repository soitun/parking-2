const mongoose = require("mongoose");
const ParkingSpot = mongoose.model("parkingspots");
const keys = require("../config/keys");

// Stripe API: https://stripe.com/docs/api/node#create_charge
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const { token, listingId, price } = req.body;

    // Create the actual charge and bill the user's credit card.
    const charge = await stripe.charges.create({
      amount: price,
      currency: "usd",
      description: "Reserve a parking spot",
      source: token.id
    });

    const updatedSpot = await ParkingSpot.findOneAndUpdate(
      { _id: listingId },
      { $set: { booked: true } },
      { new: true }
    );

    console.log(updatedSpot);

    // Send the updated user model back to whoever made the request.
    res.send(updatedSpot);
  });
};
