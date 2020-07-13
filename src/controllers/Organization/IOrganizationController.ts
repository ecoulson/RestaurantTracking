import { RequestHandler } from "express";

export default interface IOrganizationController {
    handleAccountSignOn() : RequestHandler;
    handleOrganizationRegistration() : RequestHandler;
}