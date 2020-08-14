import GetProductPricesService from "../../../../src/services/ProductPrices/GetProductPricesService"
import Stripe from "stripe";
import StripeBroker from "../../../../src/brokers/StripeBroker";
import AppType from "../../../../src/models/App/AppType";
import ProductType from "../../../../src/models/App/ProductType";

jest.mock("stripe");

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Get Product Prices Service", () => {
    test("Get Product Prices", async () => {
        StripeBroker.prototype.getProducts = 
            jest.fn().mockResolvedValue({
                data: [{ 
                    metadata: {
                        AppType: AppType.ContactLogs,
                        ProductType: ProductType.Physical
                    }
                }]
            })
        StripeBroker.prototype.getPriceOfProduct =
            jest.fn().mockResolvedValue({
                data: [{}]
            })
        const service = new GetProductPricesService(
            new StripeBroker(stripe)
        )

        const productPrices = await service.getProductPrices(AppType.ContactLogs)

        expect(productPrices).toHaveLength(1)
        expect(productPrices[0]).toEqual({
            prices: [{}],
            product: {
                metadata: {
                    AppType: AppType.ContactLogs,
                    ProductType: ProductType.Physical
                }
            }
        })
    })
})