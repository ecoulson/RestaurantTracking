import { RequestHandler } from "express";

export default interface IOrganizationBuildingController {
    handleGetBuildings() : RequestHandler;
}