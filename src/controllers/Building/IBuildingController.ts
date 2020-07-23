import { RequestHandler } from "express";

export default interface IBuildingController {
    handleCreate() : RequestHandler;
}