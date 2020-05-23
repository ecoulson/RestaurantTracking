const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    number: String,
    url: String
});

module.exports = mongoose.model("restaurant", RestaurantSchema);