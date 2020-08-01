import IPrice from "../../../../../../../API/GetBillingPlanRequest/IPrice";

export default interface IBillingCycleProps {
    option: IPrice;
    active: boolean;
    onClick: () => void;
}