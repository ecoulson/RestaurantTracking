import IFormValue from "../../FormInput/IFormValue";

export default interface ICreditCardNumberInputState {
    number: IFormValue<string>;
    cardType: string;
}