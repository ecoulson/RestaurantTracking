export default interface ICheckInBody {
    restaurantId: string;
    email?: string;
    number?: string;
    timeCheckedIn?: Date;
}