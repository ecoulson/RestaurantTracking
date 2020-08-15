import OrganizationBroker from "../../../../../src/brokers/OrganizationBroker";
import CreateCustomerService from "../../../../../src/services/Payment/CreateCustomer/CreateCustomerService";
import Stripe from "stripe"
import StripeBroker from "../../../../../src/brokers/StripeBroker";
import faker from "faker";
import { generateObjectId } from "../../../../helpers/mongo";
import OrganizationGenerator from "../../../../mocks/Generators/OrganizationGenerator";

jest.mock("stripe")

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})
const organizationGenerator = new OrganizationGenerator();

describe("Create Customer Service", () => {
    test("No organization with id", async () => {
        const organizationId = generateObjectId();
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(null)
        const service = new CreateCustomerService(
            new StripeBroker(stripe),
            new OrganizationBroker()
        )

        try {
            await service.createCustomer(
                faker.internet.email(),
                organizationId
            )
        } catch (error) {
            expect(error).toEqual(
                new Error(`No organization with id: ${organizationId}`)
            )
        }

        expect.assertions(1);
    })

    test("Makes the organization a customer", async () => {
        const organizationId = generateObjectId();
        const stripeId = generateObjectId();
        const organization = organizationGenerator.generate();
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization)
        StripeBroker.prototype.createCustomer = jest.fn().mockResolvedValue({
            id: stripeId
        })
        OrganizationBroker.prototype.save = 
            jest.fn().mockImplementation(x => x)
        const service = new CreateCustomerService(
            new StripeBroker(stripe),
            new OrganizationBroker()
        )

        const updatedCustomer = await service.createCustomer(
            faker.internet.email(),
            organizationId
        )

        expect(updatedCustomer.stripeId).toEqual(stripeId)
    })
})