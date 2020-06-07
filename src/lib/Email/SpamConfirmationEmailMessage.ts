import IEmailMessage from "./IEmailMessage";

export default class SpamConfirmationEmailMessage implements IEmailMessage {
    private address : string;

    constructor(address : string) {
        this.address = address;
    }

    getMessage() {
        return { 
            to: this.address,
            from: 'support@adaptsolutions.tech',
            templateId: "d-df44f4fbc9644f27b2b63a16232c3489"
        }
    }
}