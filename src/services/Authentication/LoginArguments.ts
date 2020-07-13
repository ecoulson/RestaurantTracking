import ILoginArguments from "./ILoginArguments";

export default class LoginArguments implements ILoginArguments {
    username: string;
    password: string;

    constructor(username : string, password : string) {
        this.username = username;
        this.password = password;
    }
}