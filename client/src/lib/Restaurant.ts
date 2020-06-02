import IRestaurant from "./IRestaurant";

export default class Restaurant implements IRestaurant {
    _id: string;
    name: string;

    constructor() {
        this._id = "";
        this.name = "";
    }
}