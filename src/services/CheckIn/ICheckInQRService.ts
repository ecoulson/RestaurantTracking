import { Response } from "express";

export default interface ICheckInQRService {
    getQRStream(organizationId: string, building: string) : (response : Response) => void;
}