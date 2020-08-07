import { OrganizationNameTypes, OrganizationNameActions } from "./types";

export function getOrganizationName(organizationId: string) : OrganizationNameTypes {
    return {
        type: OrganizationNameActions.GET,
        organizationId
    }
}

export function setOrganizationName(organizationName: string) : OrganizationNameTypes {
    return {
        type: OrganizationNameActions.SET,
        organizationName
    }
}