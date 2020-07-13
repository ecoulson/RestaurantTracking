import { Schema } from "mongoose";

const PermissionSchema = new Schema({
    operations: {
        type: [String],
        enum: [
            "Create",
            "Read",
            "Updated",
            "Delete",
            "Any"
        ]
    },
    resourceId: String,
    resourceType: {
        type: String,
        enum: [
            "Restaurant",
            "User",
            "Organization"
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