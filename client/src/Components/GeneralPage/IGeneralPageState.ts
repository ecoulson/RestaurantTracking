import IFormValue from "../FormInput/IFormValue";
import IRestaurant from "../../lib/IRestaurant";

export default interface IGeneralPageState {
    isComplete: boolean;
    email: IFormValue<string>;
    phone: IFormValue<string>;
    time: IFormValue<string>;
    restaurant: IFormValue<IRestaurant>
    focusedDropdown: boolean;
    isSubmitting: boolean;
}