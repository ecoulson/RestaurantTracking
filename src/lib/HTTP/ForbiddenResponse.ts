import IResponse from "./IResponse";
import { Response } from "express";

export default class ForbiddenResponse implements IResponse<any> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    } 

    send() {
        this.response.status(403).json({
            success: false,
            data: {
                error: "Access forbidden"
            }
        })
    }
}