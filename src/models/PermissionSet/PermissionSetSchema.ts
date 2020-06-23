import { Schema } from "mongoose";
import PermissionSetMethods from "./PermissionSetMethods";

const PermissionSetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    dateModified: {
        type: Date,
        default: new Date()
    },
    permissions: {
        type: [String],
        default: []
    }
})

PermissionSetSchema.methods.addPermission = PermissionSetMethods.addPermission;

export default PermissionSetSchema;