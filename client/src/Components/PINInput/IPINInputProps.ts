import IFormValue from "../FormInput/IFormValue";

export default interface IPINInputProps {
    onChange: (PIN : IFormValue<string>) => void;
}