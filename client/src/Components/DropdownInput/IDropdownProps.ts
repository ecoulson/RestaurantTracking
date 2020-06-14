import IRestaurantInput from "./IRestaurantInput";

export default interface IDropdownProps {
    onChange: (restaurant : IRestaurantInput) => void;
    dark?: boolean;
}