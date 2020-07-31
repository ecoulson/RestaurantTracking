import ICreateCustomerService from "./ICreateCustomerService";
import StripeBroker from "../../../brokers/StripeBroker";
import IUser from "../../../models/User/IUser";
import UserBroker from "../../../brokers/UserBroker";

export default class CreateCustomerService implements ICreateCustomerService {
    private stripeBroker : StripeBroker;
    private userBroker : UserBroker;

    constructor(stripeBroker : StripeBroker, userBroker : UserBroker) {
        this.stripeBroker = stripeBroker;
        this.userBroker = userBroker;
    }

    async createCustomer(email: string, user : IUser) {
        const customer = await this.stripeBroker.createCustomer(email, this.getFullName(user));
        user.stripeId = customer.id;
        return await this.userBroker.save(user);
    }

    getFullName(user : IUser) {
        if (user.lastName) {
            return user.firstName + " " + user.lastName
        }
        return user.firstName;
    }
}