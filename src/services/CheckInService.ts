import CheckIn from "../models/check-in/CheckInModel";
import RestaurantModel from "../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../controllers/CheckIn/ICheckIn";
import ICheckIn from "../models/check-in/ICheckIn";

export default class CheckInService {
    async checkIn(checkIn : ICheckInRequestBody, ipAddress : string) : Promise<boolean> {
        if (!await this.restaurantExists(checkIn.restaurantId)) {
            throw new Error("Can not check in to a restaurant that does not exist")
        }
        await this.saveCheckInToDB(checkIn, ipAddress);
        return true;
    }

    private async restaurantExists(restaurantId : string) {
        try {
            const restaurant = await RestaurantModel.findById(restaurantId);
            if (!restaurant) {
                return false;
            }
            return true;
        } catch (error) { 
            throw new Error(`Error when finding restaurant with ${restaurantId}`);
        }
    }

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<void> {
        const checkInDocument = new CheckIn({
            number: checkIn.number,
            email: checkIn.email,
            restaurantId: checkIn.restaurantId,
            ipAddress: ipAddress
        });
        try {
            await checkInDocument.save();
        } catch (error) {
            throw new Error(`Error when saving checkin to restaurant with ${checkIn.restaurantId} from ${ipAddress}`)
        }
    }

    async getRestaurantReport(restaurantId : string) : Promise<ICheckIn[]> {
        if (!await this.restaurantExists(restaurantId)) {
            throw new Error(`Could not generate report for ${restaurantId} because it does not exist`);
        }
        const checkIns = await CheckIn.findByRestaurantId(restaurantId);
        return this.serializeCheckins(checkIns);
    }
    
    private serializeCheckins(checkIns : ICheckIn[]) {
        return checkIns.map((checkIn) => {
            return checkIn.serialize();
        });
    }
}