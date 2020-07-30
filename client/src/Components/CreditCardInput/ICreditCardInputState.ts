import IFormValue from "../FormInput/IFormValue";

export default interface ICreditCardInputState {
    number: IFormValue<string>;
    cvc: IFormValue<string>;
    expirationDate: [IFormValue<string>, IFormValue<string>];
    zip: IFormValue<string>;
}