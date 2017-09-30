// const ParkingSpotModel = require('../models/parking-spot.js');
const mongoose = require("mongoose");
const ParkingSpot = mongoose.model("parkingspots")
module.exports = app => {

    app.post('/api/create_listing', (req, res, next) => {
        const { address, price } = req.body
        const newSpot = new ParkingSpot({
            user: req.user._id,
            address: req.body.address,
            price: req.body.price,
            startTime: 2,
            endTime: 2,
            booked: false
        });
        console.log('hehreere?')
        newSpot.save((err) => {
            if(err) {
                next(err);
                return;
                }
        
                console.log('ere?')
        res.send(newSpot);

        });
    });
}

