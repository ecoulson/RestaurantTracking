import faker from "faker"
import UserModel from "../../../src/models/user/UserModel"
import IGenerator from "./IGenerator"
import IUser from "../../../src/models/user/IUser"

export default class UserGenerator implements IGenerator<IUser> {
    private verified : boolean;
    private password : string | null;
    private passwordResetDate : Date | null;

    generate() {
        const user = new UserModel({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: this.password ? this.password : faker.internet.password(),
            verified: this.verified ? this.verified : false,
            passwordResetDate: this.passwordResetDate ? this.passwordResetDate : new Date()
        });
        this.reset();
        return user;
    }

    private reset() {
        this.verified = false;
        this.password = null;
        this.passwordResetDate = null;
    }

    setVerified() {
        this.verified = true;
    }

    setPassword(password : string) {
        this.password = password;
    }

    setPasswordResetDate(date : Date) {
        this.passwordResetDate = date;
    }
}