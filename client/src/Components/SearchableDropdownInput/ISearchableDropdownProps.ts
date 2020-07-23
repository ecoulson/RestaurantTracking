import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";

export default interface ISearchableDropdownProps {
    onChange: (restaurant : IFormValue<number>, value?: string) => void;
    dark?: boolean;
    iconColor?: string;
    id: string;
    hoverColor?: string;
    values: string[]
    icon: IconType;
    placeholder: string;
    label: string;
    initialValue?: string;
}