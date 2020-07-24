import IBuilding from "../../../../../API/GetBuildingsRequest/IBuilding";

export default interface IQuickCheckInLinksProps {
    buildings: IBuilding[];
    organizationId: string;
}