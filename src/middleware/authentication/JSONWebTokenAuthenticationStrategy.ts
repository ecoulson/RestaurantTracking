import IAuthenticationStrategy from "./IAuthenticationStrategy";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logging";
import JSONWebToken from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";
import IUserToken from "./IUserToken";
import UserModel from "../../models/user/UserModel";
import UnauthorizedResponse from "../../lib/HTTP/UnauthorizedResponse";

export default class JSONWebTokenAuthenticationStrategy implements IAuthenticationStrategy {
    authenticate() {
        return async (request : Request, response : Response, next : NextFunction) => {
            logger.debug(`Checking for authorization headers`);
            if (!this.hasAuthorizationHeader(request.headers)) {
                logger.warn(`Failed to find authorization header for request to ${request.originalUrl}`);
                return new UnauthorizedResponse(response).send();
            }
            logger.debug(`Parsing authentication token`);
            const token = this.getAuthToken(request.headers);
            logger.debug(`Parsed authentication token`);
            
            try {
                const userToken = await this.verifyToken(token);
                const user = await this.findUser(userToken._id);
                if (!user) {
                    throw new Error("Token encodes unknown user id");
                }
                request.user = user;
                logger.debug(`Authenticated request`);
                return next();
            } catch (error) {
                logger.warn(error.message);
                return new UnauthorizedResponse(response).send();
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

    private verifyToken(token : string) : Promise<IUserToken> {
        return new Promise((resolve : (value : IUserToken) => void, reject : (error : Error) => void) => {
            JSONWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (error : Error, user : any) => {
                if (error) {
                    return reject(error);
                }
                logger.info(user);
                return resolve(user);
            })
        });
    }

    private async findUser(id: string) {
        return await UserModel.findById(id);
    }
}