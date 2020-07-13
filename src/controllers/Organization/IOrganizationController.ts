import { RequestHandler } from "express";

export default interface IOrganizationController {
    handleGetOrganizationName() : RequestHandler;
}