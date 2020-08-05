import { RequestHandler } from "express";

export default interface ICheckInController {
    handleCheckIn() : RequestHandler;
    handleCheckOut() : RequestHandler;
    handleGetReport() : RequestHandler;
    handleGetCheckIn() : RequestHandler;
    handleGetQRCode() : RequestHandler;
    handleSyncCheckIns: RequestHandler;
}