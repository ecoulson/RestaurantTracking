import { Document } from "mongoose";

export default interface IDocument extends Document {
    schemaVersion: number
}