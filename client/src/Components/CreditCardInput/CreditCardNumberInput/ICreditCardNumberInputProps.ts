import IFormValue from "../../FormInput/IFormValue";

export default interface ICreditCardNumberInputProps {
    onChange: (cardNumber : IFormValue<string>) => void;
}