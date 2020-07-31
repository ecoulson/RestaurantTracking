import { Schema } from "mongoose";

const AppSchema = new Schema({
    type: {
        type: String,
        enum: [
            "ContactLogs"
        ],
        required: true
    },
    organizationId: {
        type: String,
        required: true,
        index: true
    },
    stripeSubscriptionId: {
        type: String,
        required: true
    },
    stripeProductId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
});

export default AppSchema