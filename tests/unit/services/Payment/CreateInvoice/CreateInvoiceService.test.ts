import StripeBroker from "../../../../../src/brokers/StripeBroker"
import Stripe from "stripe"
import CreateInvoiceService from "../../../../../src/services/Payment/CreateInvoice/CreateInvoiceService";
import { generateObjectId } from "../../../../helpers/mongo";
import faker from "faker";

jest.mock("stripe");

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Create Invoice Service", () => {
    test("Creates an invoice", async () => {
        const customerId = generateObjectId();
        StripeBroker.prototype.createInvoiceItem = 
            jest.fn().mockResolvedValue({});
        const service = new CreateInvoiceService(
            new StripeBroker(stripe)
        )

        const invoice = await service.createInvoice(customerId, [
            {
                description: faker.random.words(),
                price: faker.random.number()
            }
        ])

        expect(invoice).toHaveLength(1)
    })
})