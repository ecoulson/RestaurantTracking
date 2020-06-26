import { MouseEvent } from "react";

export default interface ISubmitProps {
    visible?: boolean;
    dark? : boolean;
    onClick: (event : MouseEvent) => void;
}