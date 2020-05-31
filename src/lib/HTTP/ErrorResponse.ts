import IResponse from "./IResponse";
import { Response } from "express";

export default class ErrorResponse implements IResponse<any> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    }

    send(data : any) {
        this.response.status(400).json({
            success: false,
            data
        })
    }
}