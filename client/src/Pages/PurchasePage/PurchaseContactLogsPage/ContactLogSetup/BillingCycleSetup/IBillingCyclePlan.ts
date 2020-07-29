import BillingCycleType from "./BillingCycleType";

export default interface IBillingCyclePlan {
    name: string;
    cost: number;
    type: BillingCycleType;
    unit: string;
}