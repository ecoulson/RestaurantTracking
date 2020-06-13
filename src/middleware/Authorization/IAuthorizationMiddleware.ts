import { RequestHandler } from "express";
import GetResourceIdsFunction from "../../lib/Authorization/GetResourceIdsFunction";
import OperationType from "../../lib/Authorization/OperationType";

export default interface IAuthorizationMiddleware {
    authorize(operation : OperationType, getResources : GetResourceIdsFunction) : RequestHandler
}