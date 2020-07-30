import IFormValue from "../../FormInput/IFormValue";

export default interface ICreditCardZipInputProps {
    onChange: (zip: IFormValue<string>) => void;
}