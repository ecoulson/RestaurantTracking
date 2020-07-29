import IBillingCyclePlan from "./IBillingCyclePlan";

export default interface IBillingCycleSetupProps {
    plans: IBillingCyclePlan[];
    description: string;
}