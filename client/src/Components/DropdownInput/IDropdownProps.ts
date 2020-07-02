import IRestaurantInput from "./IRestaurantInput";
import IFormValue from "../FormInput/IFormValue";

export default interface IDropdownProps {
    onChange: (restaurant : IFormValue<number>) => void;
    dark?: boolean;
    iconColor?: string;
    id?: string;
    hoverColor?: string;
    values: string[]
}