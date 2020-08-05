import { MouseEvent } from "react";

export default interface IButtonProps {
    visible?: boolean;
    dark? : boolean;
    submit? : boolean;
    id?: string;
    onClick?: (event : MouseEvent) => void;
}