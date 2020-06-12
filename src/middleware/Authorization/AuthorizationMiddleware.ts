import IAuthorizationMiddleware from "./IAuthorizationMiddleWare";
import { Request, Response, NextFunction } from "express";
import GetResourceIdsFunction from "../../lib/Authorization/GetResourceIdsFunction";

export default class AuthorizationMiddleware implements IAuthorizationMiddleware {
    authorize(operations : OperationType[], getResourceIds? : GetResourceIdsFunction) {
        return async (request : Request, response : Response, next : NextFunction) => {
            request.user
        }
    }
}