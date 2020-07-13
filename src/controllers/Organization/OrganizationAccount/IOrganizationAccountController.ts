import { RequestHandler } from "express";

export default interface IOrganizationAccountController {
    handleAccountExists() : RequestHandler;
    handleLogin(): RequestHandler;
}