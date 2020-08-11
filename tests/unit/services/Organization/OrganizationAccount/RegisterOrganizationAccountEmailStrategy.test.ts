import RegisterOrganizationAccountEmailStrategy from "../../../../../src/services/Organization/OrganizationAccount/RegisterOrganizationAccountEmailStrategy"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import faker from "faker";

const userGenerator = new UserGenerator();

describe("Register Organization Account Email Strategy", () => {
    test("Builds an email message", async () => {
        const user = await userGenerator.generate();
        const password = faker.internet.password();
        const strategy = new RegisterOrganizationAccountEmailStrategy(
            user, password
        );

        const message = await strategy.build();

        expect(message).toEqual({
            to: user.email,
            from: "support@adaptsolutions.tech",
            subject: "",
            templateId: "d-b3a11d69cfcc4b30940ac5f28e181770",
            data: {
                PIN: password
            }
        })
    })
})