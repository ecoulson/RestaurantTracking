import IUserController from "./IUserController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class UserController implements IUserController {
    handleGetSessionUser() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(request.user);
        }
    }
}