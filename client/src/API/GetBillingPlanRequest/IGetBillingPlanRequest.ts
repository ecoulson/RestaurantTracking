import IRequestProps from "../IRequestProps";
import IPrice from "./IPrice";
import { AppType } from "../../Store/Cart/types";

export default interface IGetBillingPlanRequest extends IRequestProps<IPrice[]> {
    appType: AppType;
}