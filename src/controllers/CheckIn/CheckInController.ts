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
        this.handleCheckin = this.handleCheckin.bind(this);
        this.handleGetCheckins = this.handleGetCheckins.bind(this);
    }

    public async handleCheckin(req : Request, res: Response) {
        const checkIn = req.body as ICheckIn;
        if (!await this.checkInService.checkIn(checkIn, requestIp.getClientIp(req))) {
            return ResponseHelper.sendError(res, {
                error: "Can not check in to a restaurant that does not exist"
            });   
        }
        return ResponseHelper.sendData(res, {
            message: "Successfully checked in"
        });
    }

    public async handleGetCheckins(req : Request, res: Response) {
        const getCheckInQuery = req.query as any as IGetCheckInsByRestaurantQuery;
        const checkInReport = await this.checkInService.findCheckinsByRestaurant(getCheckInQuery.restaurantId);
        res.send(checkInReport).status(200);
    }
}