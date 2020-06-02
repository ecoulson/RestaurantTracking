import IRestaurantInput from "./IRestaurantInput";

export default interface IDropdownProps {
    focused: boolean;
    onChange: (restaurant : IRestaurantInput) => void;
}