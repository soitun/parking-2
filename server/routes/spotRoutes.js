const ParkingSpotModel = require('../models/parking-spot.js');

module.exports = app => {

    app.post('/api/create', (req, res, next) => {
        
        const newSpot = new ParkingSpotModel({
            user: req.user._id,
            address: req.body.?????,
            price: req.body. ??????,
            startTime: req.body.??????,
            endTime: req.body.?????
    
        });
    
        newSpot.save((err) => {
            if(err) {
                next(err);
                return;
             }
        
        res.send(newSpot);

        });
    });
}

module.exports = app => {

    app.post('/api/create', (req, res, next) => {
        
        const newSpot = new ParkingSpotModel({
            user: req.user._id,
            address: req.body.?????,
            price: req.body. ??????,
            startTime: req.body.??????,
            endTime: req.body.?????
    
        });
    
        newSpot.save((err) => {
            if(err) {
                next(err);
                return;
                }
        
        res.send(newSpot);

        });
    });
}

