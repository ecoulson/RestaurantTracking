import { Schema } from "mongoose";
import TokenMethods from "./TokenMethods";
import TokenStatics from "./TokenStatics";

const TokenSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: {
        type: Date,
        index: true,
        required: true
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    schemaVersion: {
        type: Number,
        default: 0
    },
    scope: {
        type: [String],
        required: true
    }
});

TokenSchema.methods.serialize = TokenMethods.serialize;

TokenSchema.statics.findByUserId = TokenStatics.findByUserId;
TokenSchema.statics.findExpiredTokens = TokenStatics.findExpiredTokens;

export default TokenSchema;