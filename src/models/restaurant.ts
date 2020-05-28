import mongoose from "mongoose";

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

export default mongoose.model("restaurant", RestaurantSchema);