import IFormValue from "../../FormInput/IFormValue";

export default interface ICreditCardSecurityCodeInputProps {
    onChange: (number : IFormValue<string>) => void;
    cvvLength?: number;
}