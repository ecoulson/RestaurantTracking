import { Response } from "express";
import IResponse from "./IResponse";

export default class CSVResponse implements IResponse<string> {
    private response : Response;

    constructor(response : Response) {
        this.response = response
    }

    public send(csv : string) {
        this.response.set("Content-Type", "text/csv")
        this.response.status(200).send(csv);
    }
}