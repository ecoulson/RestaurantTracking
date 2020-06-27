import IFormValue from "../../../Components/FormInput/IFormValue";

export default interface IRestaurantPageState {
    email: IFormValue<string>;
    phoneNumber : IFormValue<string>;
    isComplete: boolean;
    errorMessage: string;
    restaurantName: string;
    isSubmitting: boolean;
    selected: number;
}