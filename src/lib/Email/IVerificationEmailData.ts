import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";

export default interface IVerificationEmailData {
    token: IToken;
    user : IUser;
    message : {
        to: string,
        from: string,
        subject: string,
        text: string,
        html: string
    }
}