import IAuthenticationStrategy from "./IAuthenticationStrategy";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logging";
import ForbiddenResponse from "../../lib/HTTP/ForbiddenResponse";
import JSONWebToken from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

export default class JSONWebTokenAuthenticationStrategy implements IAuthenticationStrategy {
    authenticate() {
        return async (request : Request, response : Response, next : NextFunction) => {
            logger.debug(`Checking for authorization headers`);
            if (!this.hasAuthorizationHeader(request.headers)) {
                logger.warn(`Failed to find authorization header for request to ${request.originalUrl}`);
                return new ForbiddenResponse(response).send();
            }
            logger.debug(`Parsing authentication token`);
            const token = this.getAuthToken(request.headers);
            logger.debug(`Parsed authentication token`);
            
            try {
                request.user = await this.verifyToken(token);
                logger.debug(`Authenticated request`);
                return next();
            } catch (error) {
                logger.warn(`Invalid token sent from ${request.originalUrl}`);
                return new ForbiddenResponse(response).send();
            }
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

    private verifyToken(token : string) : Promise<any> {
        return new Promise((resolve : (value : any) => void, reject : (error : Error) => void) => {
            JSONWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (error : Error, user) => {
                if (error) {
                    return reject(error);
                }
                return resolve(user);
            })
        });
    }
}