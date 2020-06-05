import CheckIn from "../../models/check-in/CheckInModel";
import RestaurantModel from "../../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../../controllers/CheckIn/ICheckIn";
import CSV from "../../lib/HTTP/CSV";
import ICheckIn from "../../controllers/CheckIn/ICheckIn";

export default class CheckInService {
    async checkIn(checkIn : ICheckInRequestBody, ipAddress : string) : Promise<ICheckIn> {
        if (!await this.restaurantExists(checkIn.restaurantId)) {
            throw new Error("Can not check in to a restaurant that does not exist")
        }
        return await this.saveCheckInToDB(checkIn, ipAddress);
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

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<ICheckIn> {
        const checkInDocument = new CheckIn({
            number: checkIn.number,
            email: checkIn.email,
            restaurantId: checkIn.restaurantId,
            timeCheckedIn: checkIn.timeCheckedIn ? checkIn.timeCheckedIn : undefined,
            ipAddress: ipAddress
        });
        try {
            return await checkInDocument.save();
        } catch (error) {
            throw new Error(`Error when saving checkin to restaurant with ${checkIn.restaurantId} from ${ipAddress}`)
        }
    }

    async getRestaurantReport(restaurantId : string) : Promise<string> {
        if (!await this.restaurantExists(restaurantId)) {
            throw new Error(`Could not generate report for ${restaurantId} because it does not exist`);
        }
        const checkIns = await CheckIn.findByRestaurantId(restaurantId);
        let serializedCheckIns = [];
        for (let i = 0; i < checkIns.length; i++) {
            serializedCheckIns.push(await checkIns[i].serialize());
        }
        return CSV.JSONtoCSV(serializedCheckIns);
    }
}