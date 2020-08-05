import AppType from "../../models/App/AppType";
import Stripe from "stripe";

export default interface IGetProductPricesService {
    getProductPrices(appType : AppType) : Promise<{
        product: Stripe.Product;
        prices: Stripe.Price[];
    }[]>
}