import IDocument from "../IDocument";

export default interface ICheckInSchema extends IDocument {
    email?: string;
    number?: string;
    timeCheckedIn: Date;
    ipAddress: string;
}