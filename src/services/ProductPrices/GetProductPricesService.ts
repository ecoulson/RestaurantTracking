import IGetProductPricesService from "./IGetProductPricesService";
import AppType from "../../models/App/AppType";
import StripeBroker from "../../brokers/StripeBroker";
import ProductType from "../../models/App/ProductType";
import Stripe from "stripe";

export default class GetProductPricesService implements IGetProductPricesService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async getProductPrices(appType : AppType) {
        const allProducts = await this.stripeBroker.getProducts();
        const appProducts = this.getAppProducts(allProducts.data, appType)
        const productPrices = await Promise.all(appProducts.map(async (product) => {
            const prices = (await this.stripeBroker.getPriceOfProduct(product.id)).data
            return { prices, product }
        }))
        return await productPrices;
    }

    getAppProducts(allProducts : Stripe.Product[], appType: AppType) {
        return allProducts.filter((product) => {
            return product.metadata.AppType === appType &&
                    product.metadata.ProductType === ProductType.Physical
        });
    }
}