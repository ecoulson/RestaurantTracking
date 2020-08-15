import OrganizationPINAuthenticationService from "../../../../src/services/Authentication/OrganizationPINAuthenticationService"
import UserBroker from "../../../../src/brokers/UserBroker";
import OrganizationAccountExistsService from "../../../../src/services/Organization/OrganizationAccount/OrganizationAccountExistsService";
import OrganizationBroker from "../../../../src/brokers/OrganizationBroker";
import OrganizationPINLoginArguments from "../../../../src/services/Authentication/OrganizationPinLoginArguments";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

const userGenerator = new UserGenerator();

describe("Organization PIN Authentication Service", () => {
    test("No organization account", async () => {
        OrganizationAccountExistsService.prototype.hasAccount =
            jest.fn().mockResolvedValue(false);

        const service = new OrganizationPINAuthenticationService(
            new UserBroker(),
            new OrganizationAccountExistsService(
                new OrganizationBroker()
            )
        );

        try {
            await service.login(new OrganizationPINLoginArguments("", "", ""))
        } catch (error) {
            expect(error).toEqual(new Error("No user in organization"));
        }

        expect.assertions(1);
    })

    test("No user with passed email", async () => {
        OrganizationAccountExistsService.prototype.hasAccount =
            jest.fn().mockResolvedValue(true);
        UserBroker.prototype.findUserByEmail =
            jest.fn().mockResolvedValue(null);

        const service = new OrganizationPINAuthenticationService(
            new UserBroker(),
            new OrganizationAccountExistsService(
                new OrganizationBroker()
            )
        );

        try {
            await service.login(new OrganizationPINLoginArguments("", "", ""))
        } catch (error) {
            expect(error).toEqual(new Error("No user with email"));
        }

        expect.assertions(1);
    })

    test("Incorrect password", async () => {
        const user = userGenerator.generate();
        OrganizationAccountExistsService.prototype.hasAccount =
            jest.fn().mockResolvedValue(true);
        UserBroker.prototype.findUserByEmail =
            jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        const service = new OrganizationPINAuthenticationService(
            new UserBroker(),
            new OrganizationAccountExistsService(
                new OrganizationBroker()
            )
        );

        try {
            await service.login(new OrganizationPINLoginArguments("", "", ""))
        } catch (error) {
            expect(error).toEqual(new Error(`Login for ${user._id} failed because passwords did not match`));
        }

        expect.assertions(1);
    })

    test("Incorrect password", async () => {
        const user = userGenerator.generate();
        OrganizationAccountExistsService.prototype.hasAccount =
            jest.fn().mockResolvedValue(true);
        UserBroker.prototype.findUserByEmail =
            jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(true);

        const service = new OrganizationPINAuthenticationService(
            new UserBroker(),
            new OrganizationAccountExistsService(
                new OrganizationBroker()
            )
        );

        const authenticatedUser = await service.login(new OrganizationPINLoginArguments("", "", ""));

        expect(authenticatedUser).toEqual(user);
    })
})