import { Response } from "express";

export default interface ICheckInQRService {
    getQRStream(organizationId: string, building: string) : 
        Promise<(response : Response) => void>;
}