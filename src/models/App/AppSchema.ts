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
    }
});

export default AppSchema