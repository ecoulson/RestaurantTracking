import IFormValue from "../Components/FormInput/IFormValue";

export default interface ICreditCard {
    number: IFormValue<string>;
    zip: IFormValue<string>;
    expirationDate: [IFormValue<string>, IFormValue<string>];
    cvc: IFormValue<string>;
}