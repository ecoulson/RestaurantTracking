import ICheckInQRService from "./ICheckInQRService";
import qrcode from "qrcode";
import { Response } from "express";
import InternalURLBuilder from "../../lib/URL/InternalURLBuilder";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import IOrganization from "../../models/Organization/IOrganization";

export default class SimpleCheckInQRService implements ICheckInQRService {
    private organizationBroker : OrganizationBroker;

    constructor(organizationBroker : OrganizationBroker) {
        this.organizationBroker = organizationBroker;
    }

    async getQRStream(organizationId: string, building: string) {
        const urlBuilder = new InternalURLBuilder();
        const organization = await this.getOrganization(organizationId);
        this.doesOrganizationHaveBuilding(organization, building)
        return (response : Response) => qrcode.toFileStream(
                response, 
                urlBuilder.build(
                    `check-in/${organizationId}/scan/${building
                        .split(" ").join("-")}`
                ), 
                { errorCorrectionLevel: "H" }
            );
    }

    private async getOrganization(organizationId: string) {
        const organization = 
            await this.organizationBroker.findOrganizationById(organizationId);
        if (!organization) {
            throw new Error(`No organization with id ${organizationId}`)
        }
        return organization;
    }

    private doesOrganizationHaveBuilding(organization : IOrganization, building: string) {
        if (!organization.buildings.includes(building)) {
            throw new Error(
                `Building does not exist for organization ${
                    organization.organizationId}`
            )
        };
    }
}