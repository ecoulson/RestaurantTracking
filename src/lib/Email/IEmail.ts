import IEmailData from "./IEmailData";

export default interface IEmail {
    send(): Promise<IEmailData>;
    getAddress(): string;
}