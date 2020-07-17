import mongoose from "mongoose";
import CheckInMethods from "./CheckInMethods";
import CheckInStatics from "./CheckInStatics";

const CheckInSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    timeCheckedIn: {
        type: Date,
        default: new Date()
    },
    timeCheckedOut: {
        type: Date,
        default: null
    },
    checkedOut: {
        type: Boolean,
        default: false
    },
    organizationId: { 
        type: String,
        required: true,
        index: true,
    },
    ipAddress: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    room: String
});

CheckInSchema.methods.serialize = CheckInMethods.serialize;

CheckInSchema.statics.findByOrganizationId = CheckInStatics.findByOrganizationId;

export default CheckInSchema