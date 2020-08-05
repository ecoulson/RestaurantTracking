import IRequestProps from "../IRequestProps";
import { AppType } from "../../Store/Cart/types";
import IProductPrice from "./IProductPrice";

export default interface IGetProductPricesRequest extends IRequestProps<IProductPrice[]> {
    type: AppType
}