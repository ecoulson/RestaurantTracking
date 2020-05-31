import { logger } from "../../lib/logging";
import { Request, Response, NextFunction } from "express";
import ErrorMessageResponse from "../../lib/HTTP/ErrorMessageResponse";
import ErrorResponse from "../../lib/HTTP/ErrorResponse";

function devErrorHandler(err : Error, req : Request, res : Response, next : NextFunction) {
    logger.error(err.message);
    err.stack = err.stack || ''
    new ErrorResponse(res).send({
        error: err.message,
        stack: err.message
    });
}

const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => {
    return new ErrorMessageResponse(res).send(err.message);
};

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