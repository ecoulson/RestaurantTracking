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
        required: true
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
    }
});

UserSchema.methods.serialize = UserMethods.serialize;

UserSchema.statics.findByUsername = UserStatic.findByUsername;

export default UserSchema;