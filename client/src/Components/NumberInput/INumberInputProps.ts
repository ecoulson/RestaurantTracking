import IconType from "../Icon/IconTypes";

export default interface INumberInputProps {
    onChange: (number : number) => void;
    label: string;
    placeHolder: string;
    icon: IconType;
    id: string;
    hoverColor?: string;
}