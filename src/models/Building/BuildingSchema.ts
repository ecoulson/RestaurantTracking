import { Schema } from "mongoose";

const BuildingSchema = new Schema({
    organizationId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: [
            "Academic",
            "Residential"
        ],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rooms: {
        type: [String],
        default: []
    }
})


export default BuildingSchema;