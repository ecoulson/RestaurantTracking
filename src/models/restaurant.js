const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("restaurant", RestaurantSchema);