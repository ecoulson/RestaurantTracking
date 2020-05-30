import { ICheckInModel } from "./ICheckInModel";
import ICheckIn from "./ICheckIn";

export default class CheckInStatics {
    static async findByRestaurantId(restaurantId : string) : Promise<ICheckIn[]> {
        const checkIn : ICheckInModel = (this as unknown as ICheckInModel);
        return await checkIn.find({ restaurantId });
    }
}