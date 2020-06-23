import IResponse from "./IResponse";
import { Response } from "express";

export default class ForbiddenResponse implements IResponse<string> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    } 

    send(message? : string) {
        this.response.status(403).json({
            success: false,
            data: {
                error: message ? message : "Access forbidden"
            }
        })
    }
}