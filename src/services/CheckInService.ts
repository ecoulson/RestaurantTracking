import CheckIn from "../models/check-in/CheckInModel";
import RestaurantModel from "../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../controllers/CheckIn/ICheckInRequestBody";
import ICheckIn from "../models/check-in/ICheckIn";

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
        if (checkIns.length === 0) {
            return "";
        }
        checkIns = checkIns.map((checkIn) => {
            return checkIn.serialize();
        })
        let csv = [];
        let row = [];
        const keys = Object.keys(checkIns[0]).sort();
        for (let key of keys) {
            row.push(`"${key}"`);
        }
        csv.push(row.join(","));
        for (let checkIn of checkIns) {
            row = [];
            for (let key of keys) {
                row.push(`"${checkIn[key]}"`);
            }
            csv.push(row.join(","));
        }
        return csv.join("\n");
    }
}