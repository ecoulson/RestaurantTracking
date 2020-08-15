import EmailBroker from "../../../../src/brokers/EmailBroker";
import EmailService from "../../../../src/services/Email/EmailService";
import UserVerificationEmailStrategy from "../../../../src/services/User/Registration/UserVerificationEmailStrategy";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Email Service Suite", () => {
    test("Should send an email", async () => {
        const user = userGenerator.generate();
        EmailBroker.prototype.send = jest.fn()
            .mockImplementation(x => x);
        const service = new EmailService(new EmailBroker());

        const emailData = await service.sendEmail(new UserVerificationEmailStrategy(
            user,
            tokenGenerator.generate()
        ))

        expect(emailData).toEqual({
            "message": {
                "data": {
                    "spamLink": `http://undefined:undefined/spam?email=${user.email}&token=undefined`,
                    "verificationLink": `http://undefined:undefined/verification?email=${user.email}&token=undefined`,
                },
                "from": "support@adaptsolutions.tech",
                "subject": "Verify Your Adapt Account",
                "templateId": "d-987392a0267440c7a4d329a84d5d39ff",
                "to": user.email
            },
        })
    })
});