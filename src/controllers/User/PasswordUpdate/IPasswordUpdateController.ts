import { RequestHandler } from "express";

export default interface IPasswordUpdateController {
    handlePasswordUpdate() : RequestHandler;
}