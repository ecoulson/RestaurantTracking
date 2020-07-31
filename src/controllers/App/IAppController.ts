import { RequestHandler } from "express";

export default interface IAppController {
    handleRegisterApp() : RequestHandler;
    handleGetApp(): RequestHandler;
}