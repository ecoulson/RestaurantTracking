import mongoose from "mongoose";
import CheckInMethods from "./CheckInMethods";
import CheckInStatics from "./CheckInStatics";

const CheckInSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    number: {
        type: String,
        default: ""
    },
    timeCheckedIn: {
        type: Date,
        default: Date.now()
    },
    restaurantId: { 
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
});

CheckInSchema.methods.serialize = CheckInMethods.serialize;

CheckInSchema.statics.findByRestaurantId = CheckInStatics.findByRestaurantId;

export default CheckInSchema