import EmailData from "./EmailData";
import IVerificationEmailData from "./IVerificationEmailData";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import { MailDataRequired } from "@sendgrid/mail";

export default class VerificationEmailData extends EmailData implements IVerificationEmailData {
    token: IToken;
    user: IUser;

    constructor(user : IUser, message : MailDataRequired, token : IToken) {
        super(message);
        this.user = user;
        this.token = token;
    }
}