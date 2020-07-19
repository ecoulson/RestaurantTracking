export default interface ICheckInResponse {
    _id: string;
    building: string
    checkedOut: boolean;
    organizationId: string;
    timeCheckedOut: string | null;
    timeCheckedIn: string;
}