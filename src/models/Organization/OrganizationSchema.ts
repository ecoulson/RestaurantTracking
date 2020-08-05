import { Schema } from "mongoose";
import OrganizationMethods from "./OrganizationMethods";
import OrganizationStatics from "./OrganizationStatics";

const OrganizationSchema = new Schema({
    organizationId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    organizationName: {
        type: String,
        required: true,
    },
    permissionSets: {
        type: [String],
        default: []
    },
    buildings: {
        type: [String],
        default: []
    },
    apps: {
        type: [String],
        default: []
    },
    stripeId: {
        type: String,
        default: ""
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: String,
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
})

OrganizationSchema.methods.addPermissionSet = OrganizationMethods.addPermissionSet;
OrganizationSchema.methods.addStudent = OrganizationMethods.addStudent;
OrganizationSchema.methods.getPermissionSets = OrganizationMethods.getPermissionSets;

OrganizationSchema.statics.findByOrganizationId = OrganizationStatics.findByOrganizationId;

export default OrganizationSchema;