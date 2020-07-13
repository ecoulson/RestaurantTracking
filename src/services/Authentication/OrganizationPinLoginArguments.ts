import ILoginArguments from "./ILoginArguments";

export default class OrganizationPINLoginArguments implements ILoginArguments {
    email: string;
    PIN: string;
    organizationId: string;

    constructor(email: string, PIN: string, organizationId: string) {
        this.email = email;
        this.PIN = PIN;
        this.organizationId = organizationId;
    }
}