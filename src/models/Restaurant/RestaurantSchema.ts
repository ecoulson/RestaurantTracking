import { Schema } from "mongoose";
import RestaurantMetods from "./RestaurantMethods";

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ""
    }
});

RestaurantSchema.methods.serialize = RestaurantMetods.serialize;

export default RestaurantSchema