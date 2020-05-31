import { Request, Response } from "express";
import ICheckIn from "./ICheckIn";
import IGetCheckInsByRestaurantQuery from "./IGetCheckInsByRestaurantQuery";
import CheckInService from "../../services/CheckInService";
import requestIp from "request-ip";
import { Response as ResponseHelper } from "../../lib/HTTP";

export default class CheckInController {
    checkInService : CheckInService;

    constructor() {
        this.checkInService = new CheckInService();
        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleGetReport = this.handleGetReport.bind(this);
    }

    public async handleCheckIn(req : Request, res: Response) {
        const checkIn = req.body as ICheckIn;
        const successfullyCheckedIn = await this.checkInService.checkIn(
            checkIn, requestIp.getClientIp(req)
        );
        if (!successfullyCheckedIn) {
            return ResponseHelper.sendError(res, {
                error: "Can not check in to a restaurant that does not exist"
            });   
        }
        return ResponseHelper.sendData(res, {
            message: "Successfully checked in"
        });
    }

    public async handleGetReport(req : Request, res: Response) {
        const getCheckInQuery = req.query as any as IGetCheckInsByRestaurantQuery;
        if (!await this.checkInService.restaurantExists(getCheckInQuery.restaurantId)) {
            return ResponseHelper.sendError(res, {
                error: "Could not create checkin report for restaurant that does not exist"
            });
        }
        const checkInReport = await this.checkInService.getRestaurantReport(
            getCheckInQuery.restaurantId
        );
        res.status(200).send(checkInReport);
    }
}