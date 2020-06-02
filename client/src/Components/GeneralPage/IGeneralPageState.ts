import IEmail from "../EmailInput/IEmail";
import IPhoneNumber from "../PhoneInput/IPhoneNumber";
import ITimeInput from "../TimeInput/ITimeInput";
import IRestaurantInput from "../DropdownInput/IRestaurantInput";

export default interface IGeneralPageState {
    isComplete: boolean;
    email: IEmail;
    phone: IPhoneNumber;
    time: ITimeInput;
    restaurant: IRestaurantInput
    focusedDropdown: boolean;
}