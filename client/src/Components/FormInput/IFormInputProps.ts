import IconType from "../Icon/IconTypes";
import { ChangeEvent } from "react";
import IFormValue from "./IFormValue";

export default interface IFormInputProps {
    value: string;
    disabled?: boolean
    isValid: boolean;
    label: string;
    icon: IconType;
    placeHolder: string;
    type: string;
    onChange: (value : IFormValue<string>, event? : ChangeEvent) => void;
}