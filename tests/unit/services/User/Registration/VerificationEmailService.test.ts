jest.mock( "@sendgrid/mail");
import UserModel from "../../../../../src/models/user/UserModel";
import SendGridMail from "@sendgrid/mail";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import UserVerificationEmailService from "../../../../../src/services/User/Registration/UserVerificationEmailService";
import EmailData from "../../../../../src/lib/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/lib/Email/EmailMessageBuilder";
import InternalURLBuilder from "../../../../../src/lib/URL/InternalURLBuilder";

beforeAll(() => {
    process.env.HOST_NAME = "localhost"
    process.env.PORT = "8080"
});

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Verification Email Service Suite", () => {
    describe("Send verification email", () => {
        test("Sends verification email", async () => {
            tokenGenerator.setValue("token");
            const service = new UserVerificationEmailService();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            SendGridMail.setApiKey = jest.fn();
            SendGridMail.send = jest.fn();
            
            const verificationEmail = await service.sendVerificationEmail(user, token);
            const internalURLBuilder = new InternalURLBuilder();
            const emailBuilder = new EmailMessageBuilder()
                    .setTo(user.email)
                    .setFrom("support@adaptsolutions.tech")
                    .setSubject("Verify Your Adapt Account")
                    .setTemplateId("d-987392a0267440c7a4d329a84d5d39ff")
                    .setData({
                        verificationLink: internalURLBuilder.build(`verification?email=${user.email}&token=${token.value}`),
                        spamLink: internalURLBuilder.build(`spam?email=${user.email}&token=${token.value}`)
                    })
            
            expect(verificationEmail).toEqual(
                new EmailData(emailBuilder.build().getMessage()),
            );
        })
    });
})