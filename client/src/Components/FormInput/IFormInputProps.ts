import IconType from "../Icon/IconTypes";
import { ChangeEvent } from "react";

export default interface IFormInputProps {
    value: string;
    isValid: boolean;
    label: string;
    icon: IconType;
    placeHolder: string;
    type: string;
    onChange: (event : ChangeEvent) => void;
}