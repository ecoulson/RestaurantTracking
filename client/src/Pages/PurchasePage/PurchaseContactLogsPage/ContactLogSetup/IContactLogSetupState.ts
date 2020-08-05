import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";
import IProduct from "../../../../API/GetProductPricesRequest/IProduct";

export default interface IContactLogSetupState {
    productPrices: {
        prices: IPrice[],
        product: IProduct
    }[],
    billingPrices: IPrice[]
}