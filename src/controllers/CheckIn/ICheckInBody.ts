export default interface ICheckInBody {
    organizationId: string;
    userId: string;
    timeCheckedIn?: Date;
    building: string;
    room?: string;
}