const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    number: String,
});

module.exports = mongoose.model("restaurant", RestaurantSchema);