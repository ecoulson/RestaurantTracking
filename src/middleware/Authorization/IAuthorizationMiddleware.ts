import { RequestHandler } from "express";
import GetResourceIdsFunction from "../../lib/Authorization/GetResourceIdsFunction";

export default interface IAuthorizationMiddleware {
    authorize(operations : OperationType[], getResourceIds? : GetResourceIdsFunction) : RequestHandler
}