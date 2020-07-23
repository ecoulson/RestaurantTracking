import { Schema } from "mongoose";

const PermissionSchema = new Schema({
    operations: {
        type: [String],
        enum: [
            "Create",
            "Read",
            "Update",
            "Delete",
            "Any"
        ]
    },
    resourceId: {
        type: String,
        index: true
    },
    resourceType: {
        type: String,
        enum: [
            "Restaurant",
            "User",
            "Organization",
            "CheckIn",
            "ContactLogApp",
            "Building"
        ],
        required: true
    },
    restricted: {
        type: Boolean,
        required: true
    },
    schemaVersion: {
        type: Number,
        default: 0,
    }
});

export default PermissionSchema;