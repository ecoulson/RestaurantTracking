import IUser from "../../models/User/IUser";

declare global {
    namespace Express {
        export interface Request {
            user? : IUser,
            tokenValues: Map<string, string>,
            rawBody?: string
        }
    }
}