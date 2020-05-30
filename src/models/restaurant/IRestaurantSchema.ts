import { Document } from "mongoose";

export default interface IRestaurantSchema extends Document {
    name: string;
    number: string;
    url: string;
}