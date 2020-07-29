import IBillingCyclePlan from "../../IBillingCyclePlan";

export default interface IBillingCycleProps {
    option: IBillingCyclePlan;
    active: boolean;
    onClick: () => void;
}