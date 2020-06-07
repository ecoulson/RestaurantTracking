import CheckIn from "../../models/check-in/CheckInModel";
import RestaurantModel from "../../models/restaurant/RestaurantModel";
import ICheckInRequestBody from "../../controllers/CheckIn/ICheckInBody";
import CSV from "../../lib/HTTP/CSV";
import ICheckInBody from "../../controllers/CheckIn/ICheckInBody";
import ICheckIn from "../../models/check-in/ICheckIn";

export default class CheckInService {
    async checkIn(checkIn : ICheckInRequestBody, ipAddress : string) : Promise<ICheckInBody> {
        await this.ensureRestaurantExists(checkIn);
        return await this.saveCheckInToDB(checkIn, ipAddress);
    }

    private async ensureRestaurantExists(checkIn : ICheckInRequestBody) {
        if (!await this.restaurantExists(checkIn.restaurantId)) {
            throw new Error("Can not check in to a restaurant that does not exist")
        }
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

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<ICheckInBody> {
        try {
            const checkInDocument = new CheckIn({
                number: checkIn.number,
                email: checkIn.email,
                restaurantId: checkIn.restaurantId,
                timeCheckedIn: checkIn.timeCheckedIn ? checkIn.timeCheckedIn : undefined,
                ipAddress: ipAddress
            });
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
        return CSV.JSONtoCSV(this.getSerializedCheckIns(checkIns));
    }

    private getSerializedCheckIns(checkIns : ICheckIn[]) {
        let serializedCheckIns = [];
        for (let i = 0; i < checkIns.length; i++) {
            serializedCheckIns.push(checkIns[i].serialize());
        }
        return serializedCheckIns;
    }
}