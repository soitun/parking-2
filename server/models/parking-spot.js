const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        require: true
    },

    address: {
        type: String
    },

    price: {
        type: Number
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    }
});

module.exports = router;