import IResponse from "./IResponse";
import { Response } from "express";

export default class ErrorMessageResponse implements IResponse<string> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    }

    send(data : string) {
        this.response.status(400).json({
            success: false,
            data: {
                error: data
            }
        })
    }
}