import { Response } from "express";
import IResponse from "./IResponse";

export default class MessageResponse implements IResponse<string> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    }

    send(data : string) {
        this.response.status(200).json({
            success: true,
            data: {
                message: data
            }
        });
    }
}