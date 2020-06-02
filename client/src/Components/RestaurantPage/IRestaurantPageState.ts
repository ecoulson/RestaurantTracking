import IEmail from "../EmailInput/IEmail";
import IPhoneNumber from "../PhoneInput/IPhoneNumber";

export default interface IRestaurantPageState {
    email: IEmail;
    phoneNumber : IPhoneNumber;
    isComplete: boolean;
    errorMessage: string;
}