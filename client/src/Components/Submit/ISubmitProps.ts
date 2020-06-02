import { MouseEvent } from "react";

export default interface ISubmitProps {
    visible: boolean
    onClick: (event : MouseEvent) => void;
}