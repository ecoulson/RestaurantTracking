import IPrice from "../../../../../API/GetBillingPlanRequest/IPrice";

export default interface IBillingCycleSetupProps {
    plans: IPrice[];
    description: string;
    onBillingPlan: (billingPlan: IPrice | null) => void;
}