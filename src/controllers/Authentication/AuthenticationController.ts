import { RequestHandler, Response, Request } from "express";
import IAuthenticationService from "../../services/IAuthenticationService";
import AuthenticationService from "../../services/AuthenticationService";
import ILoginBody from "./ILoginBody";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class AuthenticationController {
    authenticationService : IAuthenticationService;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    handleLogin() : RequestHandler {
        return async (request : Request, response : Response) => {
            const body : ILoginBody = request.body as ILoginBody;
            const user = await this.authenticationService.login(body.username, body.password);
            return new JSONResponse(response).send({
                token: await this.authenticationService.generateAccessToken(user)
            })
        }
    }
}