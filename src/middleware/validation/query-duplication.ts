import { Response, Request, NextFunction } from "express";
import ErrorMessageResponse from "../../lib/HTTP/ErrorMessageResponse";
const { logger } = require("../../lib/logging");

function queryDuplicationMiddleware(param : string) {
    return (req : Request, res : Response, next : NextFunction) => {
        logger.debug(`Checking query for a duplicate of the ${param} parameter`);
        if (hasDuplication((req.query as any)[param])) {
            logger.warn(`Found a duplicate of the ${param} parameter`);
            return sendDuplicateError(res, param);
        }
        logger.debug(`No duplicate of the ${param} parameter`);
        return next();
    }
}

// Is a duplicate if we are not expecting an array,
// otherwise duplication won't have an effect
function hasDuplication(param : string) {
    logger.debug(`Checking if ${param} is an array`);
    return Array.isArray(param)
}

function sendDuplicateError(res : Response, param : string) {
    logger.debug(`Sending duplicate response for ${param}`);
    new ErrorMessageResponse(res).send(`Duplicate ${param} was provided`);
}

export { 
    queryDuplicationMiddleware
};