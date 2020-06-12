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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    }
});

UserSchema.methods.serialize = UserMethods.serialize;
UserSchema.methods.addPermissionSet = UserMethods.addPermissionSet;

UserSchema.statics.findByUsername = UserStatic.findByUsername;
UserSchema.statics.findByEmail = UserStatic.findByEmail;

export default UserSchema;