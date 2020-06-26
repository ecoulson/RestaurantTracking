import { RequestHandler } from "express";

export default interface IUserController {
    handleGetSessionUser() : RequestHandler;
    handleUpdateSessionUserProfile() : RequestHandler;
}