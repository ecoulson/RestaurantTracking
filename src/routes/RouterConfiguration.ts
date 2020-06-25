import { Router as ExpressRouter } from "express";
import IRouterConfiguration from "./IRouterConfiguration";

export default abstract class RouterConfiguration implements IRouterConfiguration {
    protected router : ExpressRouter;

    constructor() {
        this.router = ExpressRouter();
    }

    public setup(): ExpressRouter {
        this.configureRoutes();
        return this.router;
    }

    public abstract configureRoutes(): void;
}