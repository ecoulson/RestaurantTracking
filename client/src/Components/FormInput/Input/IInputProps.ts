import { ChangeEvent, FocusEvent } from "react";

export default interface IInputProps {
    placeholder: string;
    value: string;
    type: string;
    name: string;
    autocomplete?: string;
    disabled?: boolean;
    id: string
    onChange: (value: string, event : ChangeEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    dark?: boolean;
}