import { Router, RequestHandler } from "express";

export default interface IRouterConfiguration {
    setup() : Router;
    configureRoutes() : void;
}