import CheckIn from "../models/check-in/CheckInModel";
import RestaurantModel from "../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../controllers/CheckIn/ICheckIn";
import ICheckIn from "../models/check-in/ICheckIn";
import CSVResponse from "../lib/HTTP/CSVResponse";

export default class CheckInService {
    async checkIn(checkIn : ICheckInRequestBody, ipAddress : string) : Promise<boolean> {
        if (!await this.restaurantExists(checkIn.restaurantId)) {
            return false;
        }
        await this.saveCheckInToDB(checkIn, ipAddress);
        return true;
    }

    async restaurantExists(restaurantId : string) {
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
        const checkIns = await CheckIn.findByRestaurantId(restaurantId);
        return this.serializeCheckins(checkIns);
    }
    
    private serializeCheckins(checkIns : ICheckIn[]) {
        return checkIns.map((checkIn) => {
            return checkIn.serialize();
        });
    }
}