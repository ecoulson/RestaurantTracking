import ICheckInModel from "./ICheckInModel";
import ICheckIn from "./ICheckIn";
import ModelStatics from "../ModelStatics";

export default class CheckInStatics {
    static async findByRestaurantId(restaurantId : string) : Promise<ICheckIn[]> {
        const checkIn : ICheckInModel = ModelStatics.getContext<ICheckInModel>(this);
        return await checkIn.find({ restaurantId });
    }
}