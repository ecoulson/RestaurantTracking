import { Request, Response } from "express";
import ICheckIn from "./ICheckIn";
import IGetCheckInsByRestaurantQuery from "./IGetCheckInsByRestaurantQuery";
import CheckInService from "../../services/CheckInService";
import requestIp from "request-ip";
import CSVResponse from "../../lib/HTTP/CSVResponse";
import CSV from "../../lib/HTTP/CSV";
import MessageResponse from "../../lib/HTTP/MessageResponse";

export default class CheckInController {
    checkInService : CheckInService;

    constructor() {
        this.checkInService = new CheckInService();
        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleGetReport = this.handleGetReport.bind(this);
    }

    public async handleCheckIn(req : Request, res: Response) {
        const checkIn = req.body as ICheckIn;
        await this.checkInService.checkIn(checkIn, requestIp.getClientIp(req));
        return new MessageResponse(res).send("Successfully checked in");
    }

    public async handleGetReport(req : Request, res: Response) {
        const getCheckInQuery = req.query as any as IGetCheckInsByRestaurantQuery;
        const checkInReport = await this.checkInService.getRestaurantReport(
            getCheckInQuery.restaurantId
        );
        return new CSVResponse(res).send(checkInReport);
    }
}