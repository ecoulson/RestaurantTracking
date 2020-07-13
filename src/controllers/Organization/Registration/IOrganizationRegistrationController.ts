import { RequestHandler } from "express";

export default interface IOrganizationRegistrationController {
    handleRegistration() : RequestHandler;
}