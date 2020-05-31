import { Response as ResponseHelper } from "../../lib/HTTP";
import { logger } from "../../lib/logging";
import { Request, Response, NextFunction } from "express";

function devErrorHandler(err : Error, req : Request, res : Response, next : NextFunction) {
    logger.error(err.message);
    err.stack = err.stack || ''
    ResponseHelper.sendError(res, { 
        error: err.message,
        stack: err.stack
    })
}

const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => ResponseHelper.sendError(res, { error: err.message });

function catchErrors(fn : any) {
    return function(req: Request, res : Response, next : NextFunction) {
        fn(req, res, next).catch(next);
    }
}

export {
    devErrorHandler,
    errorHandler,
    catchErrors
}