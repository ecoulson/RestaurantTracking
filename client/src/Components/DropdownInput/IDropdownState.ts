import IRestaurant from "../../lib/IRestaurant";

export default interface IDropdownState {
    restaurants: IRestaurant[];
    filteredRestaurants: IRestaurant[];
    value: string;
    valid: boolean;
    focused: boolean;
}