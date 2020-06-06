import { RequestHandler, Response, Request } from "express";
import IAuthenticationService from "../../services/Authentication/IAuthenticationService";
import AuthenticationService from "../../services/Authentication/AuthenticationService";
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
            const token = await this.authenticationService.generateAccessToken(user);
            response.setHeader("Set-Cookie", `userToken=${token}`)
            return new JSONResponse(response).send({ token });
        }
    }
}