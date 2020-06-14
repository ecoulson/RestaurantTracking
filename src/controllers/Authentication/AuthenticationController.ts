import { RequestHandler, Response, Request } from "express";
import IAuthenticationService from "../../services/Authentication/IAuthenticationService";
import AuthenticationService from "../../services/Authentication/AuthenticationService";
import ILoginBody from "./ILoginBody";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../../models/user/UserModel";

export default class AuthenticationController {
    authenticationService : IAuthenticationService;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    handleLogin() : RequestHandler {
        return async (request : Request, response : Response) => {
            const body : ILoginBody = request.body as ILoginBody;
            const user = await this.authenticationService.login(body.username, body.password);
            const token = await this.authenticationService.generateAccessToken(
                user,
                body.rememberMe
            );
            if (!user.verified) {
                return new JSONResponse(response).send({ 
                    verified: false,
                    token
                })
            }
            return new JSONResponse(response).send({ 
                verified: true,
                token 
            });
        }
    }

    isSessionActive() : RequestHandler {
        return async (request : Request, response : Response) => {
            const token = request.cookies.token as string;
            try {
                const result : any = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const user = await UserModel.findById(result._id);
                return new JSONResponse(response).send({
                    isActive: user.verified
                });
            } catch (error) {
                return new JSONResponse(response).send({
                    isActive: false
                });
            }
        }
    }
}