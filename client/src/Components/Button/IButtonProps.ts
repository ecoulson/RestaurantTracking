import { MouseEvent } from "react";

export default interface IButtonProps {
    visible?: boolean;
    dark? : boolean;
    submit? : boolean;
    onClick?: (event : MouseEvent) => void;
}