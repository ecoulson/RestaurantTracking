import IFormValue from "../FormInput/IFormValue";

export default interface IEmailProps {
    onChange: (email : IFormValue<string>) => void;
}