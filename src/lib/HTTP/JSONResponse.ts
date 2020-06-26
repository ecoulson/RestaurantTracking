import { Response } from "express";
import IResponse from "./IResponse";

export default class JSONResponse implements IResponse<any> {
    private response : Response;

    constructor(response : Response) {
        this.response = response;
    }

    send(data? : any) {
        this.response.status(200).json({
            success: true,
            data
        });
    }
}