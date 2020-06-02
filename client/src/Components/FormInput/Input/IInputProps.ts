import { ChangeEvent, FocusEvent } from "react";

export default interface IInputProps {
    placeholder: string;
    value: string;
    type: string;
    onChange: (event: ChangeEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onUnfocus?: (event: FocusEvent) => void;
}