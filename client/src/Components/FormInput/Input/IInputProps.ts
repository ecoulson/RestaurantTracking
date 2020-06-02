import { ChangeEvent } from "react";

export default interface IInputProps {
    placeholder: string;
    value: string;
    type: string;
    onChange: (event: ChangeEvent) => void;
}