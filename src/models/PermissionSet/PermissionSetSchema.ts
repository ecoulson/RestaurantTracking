import { Schema } from "mongoose";
import PermissionSetMethods from "./PermissionSetMethods";
import PermissionSetStatics from "./PermissionSetStatics";

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

PermissionSetSchema.statics.findPermissionSetByName = PermissionSetStatics.findPermissionSetByName;

export default PermissionSetSchema;