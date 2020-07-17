import IDocument from "../IDocument";

export default interface ICheckInSchema extends IDocument {
    checkedOut: boolean;
    timeCheckedIn: Date;
    timeCheckedOut: Date;
    ipAddress: string;
    building: string;
    room?: string;
}