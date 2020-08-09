import OrganizationGenerator from "../../../mocks/Generators/OrganizationGenerator"
import SimpleCheckInQRService from "../../../../src/services/CheckIn/SimpleCheckInQRService";
import qrcode from "qrcode";
import OrganizationBroker from "../../../../src/brokers/OrganizationBroker";
import faker from "faker";

jest.mock("qrcode");

const organizationGenerator = new OrganizationGenerator();

beforeAll(() => {
    process.env.HOST_NAME = "adaptsolutions.tech"
    process.env.CLIENT_PORT = "80"
})

beforeEach(() => {
    qrcode.toFileStream = 
            jest.fn().mockImplementation(
                (response, url, params) => [response, url, params]
            )
})

describe("Simple Check In QR Service", () => {
    test("Organization does not exist", async () => {
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(null);
        const organizationId = faker.name.firstName();
        const service = new SimpleCheckInQRService(new OrganizationBroker());

        try {
            await service.getQRStream(
                organizationId,
                faker.name.firstName()
            )
        } catch (error) {
            expect(error).toEqual(
                new Error(
                    `No organization with id ${organizationId}`
                )
            )
        }

        expect.assertions(1);
    })

    test("Building does not exist for organization", async () => {
        const organization = organizationGenerator.generate();
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization);
        const service = new SimpleCheckInQRService(new OrganizationBroker());

        try {
            await service.getQRStream(
                organization.organizationId,
                faker.name.firstName()
            )
        } catch (error) {
            expect(error).toEqual(
                new Error(
                    `Building does not exist for organization ${organization.organizationId}`
                )
            )
        }

        expect.assertions(1);
    });

    test("Builds a QR stream", async () => {
        const organization = organizationGenerator.generate();
        const building = faker.name.firstName();
        organization.buildings.push(building);
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization);
        const service = new SimpleCheckInQRService(new OrganizationBroker());

        const stream = await service.getQRStream(
            organization.organizationId,
            organization.buildings[0]
        );

        expect(stream({} as any)).toEqual([
            {}, 
            `http://adaptsolutions.tech:80/check-in/${organization.organizationId}/scan/${building}`, 
            { errorCorrectionLevel: "H"}
        ])
    })
})