import { ChangeEvent, FocusEvent } from "react";

export default interface IInputProps {
    placeholder: string;
    value: string;
    type: string;
    disabled?: boolean;
    onChange: (value: string, event : ChangeEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    dark?: boolean;
}