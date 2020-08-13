import GetSetupIntentService from "../../../../../src/services/Payment/SetupIntent/GetSetupIntentService"
import Stripe from "stripe"
import StripeBroker from "../../../../../src/brokers/StripeBroker"
import { generateObjectId } from "../../../../helpers/mongo"

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Get Set Up Intent Service", () => {
    test("Get Setup Intent", async () => {
        StripeBroker.prototype.getSetupIntent =
            jest.fn().mockResolvedValue({})
        const service = new GetSetupIntentService(new StripeBroker(stripe))
        
        const intent = await service.getSetupIntent(generateObjectId())

        expect(intent).toEqual({});
    })
})