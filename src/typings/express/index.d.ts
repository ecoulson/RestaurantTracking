import IUser from "../../models/user/IUser";

declare global {
    namespace Express {
        export interface Request {
            user? : IUser,
            tokenValues: Map<string, string>
        }
    }
}