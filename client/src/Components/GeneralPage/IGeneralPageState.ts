import IEmail from "../EmailInput/IEmail";
import IPhoneNumber from "../PhoneInput/IPhoneNumber";

export default interface IGeneralPageState {
    isComplete: boolean;
    email: IEmail;
    phone: IPhoneNumber;
}