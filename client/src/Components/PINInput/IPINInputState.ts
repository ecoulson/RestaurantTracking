import React from "react";

export default interface IPINInputState {
    digits: string[],
    refs: React.RefObject<HTMLInputElement>[]
}