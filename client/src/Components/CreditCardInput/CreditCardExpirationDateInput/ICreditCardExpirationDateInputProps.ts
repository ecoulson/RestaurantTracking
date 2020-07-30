import IFormValue from "../../FormInput/IFormValue";

export default interface ICreditCardExpirationDateInputProps {
    onChange : (date: [IFormValue<string>, IFormValue<string>]) => void;
}