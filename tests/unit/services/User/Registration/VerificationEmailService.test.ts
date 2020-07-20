jest.mock( "@sendgrid/mail");
import SendGridMail from "@sendgrid/mail";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import UserVerificationService from "../../../../../src/services/User/Verification/UserVerificationService";
import UserVerificationStrategy from "../../../../../src/services/User/Verification/UserVerificationStrategy";
import TokenBroker from "../../../../../src/brokers/TokenBroker";
import UserBroker from "../../../../../src/brokers/UserBroker";
import Scope from "../../../../../src/services/Token/Scope";

beforeAll(() => {
    process.env.HOST_NAME = "localhost"
    process.env.PORT = "8080"
});

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Verification Email Service Suite", () => {
    describe("Send verification email", () => {
        test("Sends verification email", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setValue("token");
            tokenGenerator.setScope([Scope.VerifyEmail])
            const token = tokenGenerator.generate();
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(user);
            UserBroker.prototype.save = jest.fn().mockResolvedValue(user);
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([token]);
            TokenBroker.prototype.remove = jest.fn()
            SendGridMail.setApiKey = jest.fn();
            SendGridMail.send = jest.fn();
            const service = new UserVerificationService();
            
            const verificationEmail = await service.verify(new UserVerificationStrategy(
                new UserBroker(),
                new TokenBroker(),
                token.value,
                user.email
            ));
    
            expect(verificationEmail).toEqual(user);
        })
    });
})