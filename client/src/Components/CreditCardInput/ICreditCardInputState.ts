import IFormValue from "../FormInput/IFormValue";

export default interface ICreditCardInputState {
    number: IFormValue<string>;
    cvc: IFormValue<string>;
    expirationDate: IFormValue<[string, string]>;
    zip: IFormValue<string>;
}