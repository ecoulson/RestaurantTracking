import IconType from "../Icon/IconTypes";

export default interface ITextInputProps {
    label: string;
    icon: IconType;
    iconColor: string;
    hoverColor: string;
    name: string;
    autocomplete?: string;
    help?: string;
    id: string;
    isValid?: boolean;
    dark?: boolean;
    placeholder: string;
    onChange : (value: string) => void;
}