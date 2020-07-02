import IRestaurant from "../../lib/IRestaurant";

export default interface IRestaurantDropdownStateProps {
    values: IRestaurant[],
    filteredValues: IRestaurant[]
    message: string;
}