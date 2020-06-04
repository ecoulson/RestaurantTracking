import IUser from "../../models/user/IUser";

declare namespace Express {
    export interface Request {
        user? : IUser
    }
}