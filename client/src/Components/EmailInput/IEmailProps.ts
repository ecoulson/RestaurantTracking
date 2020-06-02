import IEmail from "./IEmail";

export default interface IEmailProps {
    onChange: (email : IEmail) => void;
}