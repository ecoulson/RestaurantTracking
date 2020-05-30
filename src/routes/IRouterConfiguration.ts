import { Router, RequestHandler } from "express";

export default interface IRouterConfiguration {
    setup() : Router;
    configureRoutes() : void;
    get(path: string, middleware : RequestHandler[], handler : RequestHandler);
    post(path: string, middleware : RequestHandler[], handler : RequestHandler);
}