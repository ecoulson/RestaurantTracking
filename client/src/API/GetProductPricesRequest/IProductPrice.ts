import IProduct from "./IProduct";
import IPrice from "../GetBillingPlanRequest/IPrice";

export default interface IProductPrice {
    product: IProduct,
    prices: IPrice[]
}