import OrganizationAccountExistsService from "../../../../../src/services/Organization/OrganizationAccount/OrganizationAccountExistsService"
import OrganizationBroker from "../../../../../src/brokers/OrganizationBroker"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import faker from "faker";

const userGenerator = new UserGenerator();

describe("Organization Account Exists Service", () => {
    describe("Has Account", () => {
        test("Account does not exist", async () => {
            OrganizationBroker.prototype.findUser = 
                jest.fn().mockResolvedValue(null);
            const service = new OrganizationAccountExistsService(
                new OrganizationBroker()
            );

            const exists = await service.hasAccount(
                faker.name.firstName(),
                faker.internet.email()
            )

            expect(exists).toBeFalsy()
        })

        test("Account does exist", async () => {
            OrganizationBroker.prototype.findUser = 
                jest.fn().mockResolvedValue(userGenerator.generate());
            const service = new OrganizationAccountExistsService(
                new OrganizationBroker()
            );

            const exists = await service.hasAccount(
                faker.name.firstName(),
                faker.internet.email()
            )

            expect(exists).toBeTruthy()
        })
    })

    describe("Is Verified", () => {
        test("Account does not exist", async () => {
            OrganizationBroker.prototype.findUser = 
                jest.fn().mockResolvedValue(null);
            const service = new OrganizationAccountExistsService(
                new OrganizationBroker()
            );

            const verified = await service.isVerified(
                faker.name.firstName(),
                faker.internet.email()
            )

            expect(verified).toBeFalsy()
        })

        test("Account does exist but not verified", async () => {
            OrganizationBroker.prototype.findUser = 
                jest.fn().mockResolvedValue(userGenerator.generate());
            const service = new OrganizationAccountExistsService(
                new OrganizationBroker()
            );

            const verified = await service.isVerified(
                faker.name.firstName(),
                faker.internet.email()
            )

            expect(verified).toBeFalsy()
        })

        test("Account does exist but not verified", async () => {
            userGenerator.setVerified()
            OrganizationBroker.prototype.findUser = 
                jest.fn().mockResolvedValue(userGenerator.generate());
            const service = new OrganizationAccountExistsService(
                new OrganizationBroker()
            );

            const verified = await service.isVerified(
                faker.name.firstName(),
                faker.internet.email()
            )

            expect(verified).toBeTruthy()
        })
    })
})