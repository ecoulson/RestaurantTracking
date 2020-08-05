import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";

export default interface IContactLogPricingState {
    standingDisplays: number;
    tableTopDisplays: number;
    wallDisplays: number;
    billingPlans: IPrice[];
    currentPlan: IPrice | null;
}