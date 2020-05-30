import { Request, Response } from "express";
import ICheckInRequestBody from "./ICheckInRequestBody";
import IGetCheckInByIdQuery from "./IGetCheckInByIdQuery";
import CheckInService from "../../services/CheckInService";
import requestIp from "request-ip";
import { Response as ResponseHelper } from "../../lib/HTTP";

export default class CheckInController {
    checkInService : CheckInService;

    constructor() {
        this.checkInService = new CheckInService();
    }

    async handleCheckin(req : Request, res: Response) {
        const checkIn = req.body as ICheckInRequestBody;
        if (!await this.checkInService.checkIn(checkIn, requestIp.getClientIp(req))) {
            return ResponseHelper.sendError(res, {
                error: "Can not check in to a restaurant that does not exist"
            });   
        }
        return ResponseHelper.sendData(res, {
            message: "Successfully checked in"
        });
    }

    async handleGetCheckins(req : Request, res: Response) {
        const getCheckInQuery = req.query as any as IGetCheckInByIdQuery;
        const checkInReport = await this.checkInService.findCheckinsByRestaurant(getCheckInQuery.restaurantId);
        res.send(checkInReport).status(200);
    }
}