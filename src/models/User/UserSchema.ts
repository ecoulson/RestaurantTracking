import { Schema } from "mongoose";
import UserMethods from "./UserMethods";
import UserStatic from "./UserStatic";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    number: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    passwordResetDate: {
        type: Date,
        default: new Date()
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    permissionSets: {
        type: [String],
        default: []
    },
    organizations: {
        type: [String],
        default: []
    },
    anonymous: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.serialize = UserMethods.serialize;
UserSchema.methods.addPermissionSet = UserMethods.addPermissionSet;
UserSchema.methods.addPermission = UserMethods.addPermission;

UserSchema.statics.findByUsername = UserStatic.findByUsername;
UserSchema.statics.findByEmail = UserStatic.findByEmail;

export default UserSchema;