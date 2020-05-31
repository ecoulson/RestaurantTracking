import { Request, Response, NextFunction, RequestHandler } from "express";

export default interface IAuthenticationStrategy {
    authenticate(request : Request, response : Response, next : NextFunction) : RequestHandler
}