import IRequestProps from "../IRequestProps";
import AppType from "../../lib/AppType";
import IPrice from "./IPrice";

export default interface IGetBillingPlanRequest extends IRequestProps<IPrice[]> {
    appType: AppType
}