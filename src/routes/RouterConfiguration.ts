import { Router as ExpressRouter, RequestHandler } from "express";
import IRouterConfiguration from "./IRouterConfiguration";
import { catchErrors } from "../middleware/error-handling";

export default abstract class RouterConfiguration<Controller> implements IRouterConfiguration {
    private router : ExpressRouter;
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

    public get(path: string, middleware: RequestHandler[], handler: RequestHandler) {
        this.router.get(path, ...middleware, catchErrors(this.bindHandler(handler)));
    }

    private bindHandler(handler : RequestHandler) : RequestHandler {
        return handler.bind(this.controller);
    }

    public post(path: string, middleware: RequestHandler[], handler: RequestHandler) {
        this.router.post(path, ...middleware, catchErrors(this.bindHandler(handler)));
    }

    public use(path: string, configuration : IRouterConfiguration) {
        this.router.use(path, configuration.setup());
    }
}