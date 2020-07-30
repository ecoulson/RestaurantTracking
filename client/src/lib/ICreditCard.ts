import IFormValue from "../Components/FormInput/IFormValue";

export default interface ICreditCard {
    number: IFormValue<string>;
    zip: IFormValue<string>;
    expirationDate: IFormValue<[string, string]>;
    cvc: IFormValue<string>;
}