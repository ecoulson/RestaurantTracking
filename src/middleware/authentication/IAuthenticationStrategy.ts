import { Request, Response, NextFunction } from "express";

export default interface IAuthenticationStrategy {
    authenticate(request : Request, response : Response, next : NextFunction) : void
}