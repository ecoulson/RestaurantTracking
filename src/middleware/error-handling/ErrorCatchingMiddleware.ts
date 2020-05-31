import { Request, Response, NextFunction } from "express";

export default class ErrorCatchingMiddlware {
    static catchErrors(fn : any) {
        return function(req: Request, res : Response, next : NextFunction) {
            fn(req, res, next).catch(next);
        }
    }
}