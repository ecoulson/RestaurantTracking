export interface IOrganizationName {
    fetched: boolean;
    fetching: boolean;
    name: string | null;
    organizationId: string | null;
}

export enum OrganizationNameActions {
    GET = "Get",
    SET = "Set"
}

interface IGetOrganizationNameShow {
    type: OrganizationNameActions.GET;
    organizationId: string;
}

interface ISetOrganizationNameShow {
    type: OrganizationNameActions.SET;
    organizationName: string;
}

export type OrganizationNameTypes = IGetOrganizationNameShow | ISetOrganizationNameShow;