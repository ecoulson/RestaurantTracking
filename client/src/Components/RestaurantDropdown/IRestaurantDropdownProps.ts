import IRestaurant from "../../lib/IRestaurant";
import IFormValue from "../FormInput/IFormValue";

export default interface IRestaurantDropdownProps {
    dark?: boolean;
    hoverColor?: string;
    iconColor?: string;
    onChange: (restaurant : IFormValue<IRestaurant>) => void;
}