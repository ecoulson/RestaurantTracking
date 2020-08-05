import IBuilding from "../../../API/GetBuildingsRequest/IBuilding";

export default interface IOrganizationCheckInState  {
    organizationName: string;
    dropdownInputType: number;
    send: boolean;
    building: IBuilding | null;
}