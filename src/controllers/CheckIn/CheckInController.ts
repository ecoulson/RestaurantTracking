import { Request, Response } from "express";
import ICheckInBody from "./ICheckInBody";
import IGetCheckInsByRestaurantQuery from "./IGetCheckInsByOrganizationQuery";
import CheckInService from "../../services/CheckIn/CheckInService";
import requestIp from "request-ip";
import CSVResponse from "../../lib/HTTP/CSVResponse";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import ICheckInController from "./ICheckInController";
import IGetCheckInService from "../../services/CheckIn/IGetCheckInService";
import ICheckoutService from "../../services/CheckIn/ICheckoutService";
import ICheckInQRService from "../../services/CheckIn/ICheckInQRService";

export default class CheckInController implements ICheckInController {
    private checkInService : CheckInService;
    private getCheckInService : IGetCheckInService;
    private checkOutService : ICheckoutService;
    private qrCodeService : ICheckInQRService;

    constructor(checkInService : CheckInService, getCheckInService : IGetCheckInService, checkoutService : ICheckoutService, qrCodeService : ICheckInQRService) {
        this.checkInService = checkInService;
        this.getCheckInService = getCheckInService;
        this.checkOutService = checkoutService;
        this.qrCodeService = qrCodeService;
    }

    handleCheckIn() {
        return async (req : Request, res: Response) => {
            const checkInBody = req.body as ICheckInBody;
            checkInBody.userId = req.user._id
            const checkIn = await this.checkInService.checkIn(checkInBody, requestIp.getClientIp(req));
            return new JSONResponse(res).send(checkIn);
        }
    }

    handleCheckOut() {
        return async (req : Request, res: Response) => {
            const checkIn = await this.checkOutService.checkout(req.body.checkInId);
            return new JSONResponse(res).send(checkIn);
        }
    }

    handleGetReport() {
        return async (req : Request, res: Response) => {
            const getCheckInQuery = req.query as any as IGetCheckInsByRestaurantQuery;
            const checkInReport = await this.checkInService.getOrganizationReport(
                getCheckInQuery.restaurantId
            );
            return new CSVResponse(res).send(checkInReport);
        }
    }

    handleGetCheckIn() {
        return async (req : Request, res: Response) => {
            const checkIn = await this.getCheckInService.getCheckIn(
                req.params.checkInId
            );
            return new JSONResponse(res).send(checkIn);
        }
    }

    handleGetQRCode() {
        return async (req : Request, res: Response) => {
            return this.qrCodeService.getQRStream(req.body.organizationId, req.body.building)(res);
        }
    }
}