import CheckIn from "../models/check-in/CheckInModel";
import RestaurantModel from "../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../controllers/CheckIn/ICheckIn";
import ICheckIn from "../models/check-in/ICheckIn";
import CSVResponse from "../lib/HTTP/CSVResponse";

export default class CheckInService {
    async checkIn(checkIn : ICheckInRequestBody, ipAddress : string) : Promise<boolean> {
        const restaurant = await RestaurantModel.findById(checkIn.restaurantId);
        if (!restaurant) {
            return false;
        }
        await this.saveCheckInToDB(checkIn, ipAddress);
        return true;
    }

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<void> {
        const checkInDocument = new CheckIn({
            number: checkIn.number,
            email: checkIn.email,
            restaurantId: checkIn.restaurantId,
            ipAddress: ipAddress
        });
        await checkInDocument.save();
    }

    async findCheckinsByRestaurant(restaurantId : string) : Promise<string> {
        const checkIns = await CheckIn.findByRestaurantId(restaurantId);
        return this.convertCheckinsByRestaurntToCSV(checkIns);
    }
    
    private convertCheckinsByRestaurntToCSV(checkIns : ICheckIn[]) {
        checkIns = checkIns.map((checkIn) => {
            return checkIn.serialize();
        })
        return new CSVResponse().build(checkIns)
    }
}