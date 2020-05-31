import { Router } from "express";

export default interface IRouterConfiguration {
    setup() : Router;
    configureRoutes() : void;
}