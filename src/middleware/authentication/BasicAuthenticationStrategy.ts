import { logger } from "../../lib/logging";
import { Request, NextFunction, Response } from "express";
import { IncomingHttpHeaders } from "http";
import ForbiddenResponse from "../../lib/HTTP/ForbiddenResponse";
import IAuthenticationStrategy from "./IAuthenticationStrategy";

export default class BasicAuthenticationStrategy implements IAuthenticationStrategy {
    constructor() {
        // this.authenticate = this.authenticate.bind(this);
    }

    public authenticate() {
        return (request : Request, response : Response, next : NextFunction) => {
            logger.debug(`Checking for authorization headers`);
            if (!this.hasAuthorizationHeader(request.headers)) {
                logger.warn(`Failed to find authorization header for request to ${request.originalUrl}`);
                return new ForbiddenResponse(response).send();
            }
            logger.debug(`Parsing authentication token`);
            const token = this.getAuthToken(request.headers);
            logger.debug(`Parsed authentication token`);
            if (!this.isValidToken(token)) {
                logger.warn(`Invalid token sent from ${request.originalUrl}`);
                return new ForbiddenResponse(response).send();
            }
            logger.debug(`Authenticated request`);
            return next();
        }
    }

    private hasAuthorizationHeader(headers : IncomingHttpHeaders) {
        return headers["authorization"] || headers["Authorization"];
    }

    private getAuthToken(headers : IncomingHttpHeaders) {
        return (this.getAuthHeader(headers) as string).split(" ")[1];
    }

    private getAuthHeader(headers : IncomingHttpHeaders) {
        if (headers["authorization"]) {
            return headers["authorization"];
        }
        return headers["Authorization"];
    }

    private isValidToken(token : string) {
        logger.debug(`Validating token`);
        return token && token === process.env.SERVER_SECRET
    }
}