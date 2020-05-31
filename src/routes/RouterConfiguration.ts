import { Router as ExpressRouter } from "express";
import IRouterConfiguration from "./IRouterConfiguration";

export default abstract class RouterConfiguration<Controller> implements IRouterConfiguration {
    protected router : ExpressRouter;
    protected controller : Controller;

    constructor(controller : Controller) {
        this.router = ExpressRouter();
        this.controller = controller;
    }

    public setup(): ExpressRouter {
        this.configureRoutes();
        return this.router;
    }

    public abstract configureRoutes(): void;
}