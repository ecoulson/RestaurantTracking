import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import IEmailData from "./IEmailData";

export default interface IVerificationEmailData extends IEmailData {
    token: IToken;
    user : IUser;
}