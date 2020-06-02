import IFormValue from "../FormInput/IFormValue";

export default interface IPhoneInputProps {
    onChange: (phoneNumber : IFormValue<string>) => void;
}