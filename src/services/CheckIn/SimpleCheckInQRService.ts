import ICheckInQRService from "./ICheckInQRService";
import qrcode from "qrcode";
import { Response } from "express";
import InternalURLBuilder from "../../lib/URL/InternalURLBuilder";

export default class SimpleCheckInQRService implements ICheckInQRService {
    getQRStream(organizationId: string, building: string) {
        const urlBuilder = new InternalURLBuilder();
        return (response : Response) => {
            qrcode.toFileStream(response, urlBuilder.build(`check-in/${organizationId}/scan/${building}`), {
                errorCorrectionLevel: "H"
            })
        }
    }
}