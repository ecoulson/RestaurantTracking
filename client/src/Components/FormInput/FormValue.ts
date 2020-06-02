import IFormValue from "./IFormValue";

export default class FormValue<T> implements IFormValue<T> {
    value: T;
    valid: boolean;

    constructor(value: T, valid: boolean) {
        this.valid = valid;
        this.value = value;
    }
}