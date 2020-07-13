import React from "react";

export default interface IPINDigitProps {
    inputRef: React.RefObject<HTMLInputElement>
    complete : boolean;
    onChange: (digit : string, deleted: boolean) => void;
}