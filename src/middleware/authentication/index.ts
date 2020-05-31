import { Response as ResponseHelper } from "../../lib/HTTP";
import { logger } from "../../lib/logging";
import { Request, NextFunction, Response } from "express";
import { IncomingHttpHeaders } from "http";

function authenticate(req : Request, res : Response, next : NextFunction) {
    logger.debug(`Checking for authorization headers`);
    if (!hasAuthorizationHeader(req.headers)) {
        logger.warn(`Failed to find authorization header for request to ${req.originalUrl}`);
        return ResponseHelper.sendForbidden(res)
    }
    logger.debug(`Parsing authentication token`);
    const token = getAuthToken(req.headers);
    logger.debug(`Parsed authentication token`);
    if (!isValidToken(token)) {
        logger.warn(`Invalid token sent from ${req.originalUrl}`);
        return ResponseHelper.sendForbidden(res);
    }
    logger.debug(`Authenticated request`);
    return next();
}

function hasAuthorizationHeader(headers : IncomingHttpHeaders) {
    return headers["authorization"] || headers["Authorization"];
}

function getAuthToken(headers : IncomingHttpHeaders) {
    return (getAuthHeader(headers) as string).split(" ")[1];
}

function getAuthHeader(headers : IncomingHttpHeaders) {
    if (headers["authorization"]) {
        return headers["authorization"];
    }
    return headers["Authorization"];
}

function isValidToken(token : string) {
    logger.debug(`Validating token`);
    return token && token === process.env.SERVER_SECRET
}

export { 
    authenticate
};