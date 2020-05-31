import { Document } from "mongoose";

export default interface ICheckInSchema extends Document {
    email?: string;
    number?: string;
    timeCheckedIn: Date;
    ipAddress: string;
}