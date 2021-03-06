import IconType from "../Icon/IconTypes";
import { ChangeEvent } from "react";
import IFormValue from "./IFormValue";

export default interface IFormInputProps {
    iconColor?: string;
    id: string;
    help?: string;
    name: string;
    autocomplete?: string;
    value: string;
    disabled?: boolean
    isValid?: boolean;
    label: string;
    icon: IconType;
    placeHolder: string;
    type: string;
    dark?: boolean;
    hoverColor?: string;
    onChange: (value : IFormValue<string>, event? : ChangeEvent) => void;
}