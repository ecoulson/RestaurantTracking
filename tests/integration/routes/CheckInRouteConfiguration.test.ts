import { 
    expectErrorResponse, 
    expectStatusCode
} from "../../helpers/expect";
import UserGenerator from "../../mocks/Generators/UserGenerator";
import request from "supertest";
import app from "../../../src/app";
import jsonwebtoken from "jsonwebtoken";
import * as TestDatabase from "../../helpers/database"
import OrganizationGenerator from "../../mocks/Generators/OrganizationGenerator";
import PermissionBuilder from "../../../src/services/Permission/PermissionBuilder";
import OperationType from "../../../src/lib/Authorization/OperationType";
import ResourceType from "../../../src/lib/Authorization/ResourceType";
import PermissionSetModel from "../../../src/models/PermissionSet/PermissionSetModel";
import BuildingModel from "../../../src/models/Building/BuildingModel";
import BuildingType from "../../../src/models/Building/BuildingType";

const userGenerator = new UserGenerator();
const organizationGenerator = new OrganizationGenerator();
userGenerator.setVerified();
let user = userGenerator.generate();
let organization = organizationGenerator.generate();
let building = new BuildingModel({
    name: "school",
    type: BuildingType.Academic,
    organizationId: organization.organizationId
})
let permission = new PermissionBuilder()
    .setOperations([OperationType.Create])
    .setResourceId(organization._id)
    .setResourceType(ResourceType.Organization)
    .setRestricted()
    .build();
let permissionSet = new PermissionSetModel({
    name: `student`
});
let jwt : string = ""

beforeAll(async () => {
    await TestDatabase.connect();
    process.env.ACCESS_TOKEN_SECRET = "super_duper_secret"
});

beforeEach(async () => {
    user = userGenerator.generate();
    organization = organizationGenerator.generate();
    building = new BuildingModel({
        name: "school",
        type: BuildingType.Academic,
        organizationId: organization.organizationId
    })
    permission = new PermissionBuilder()
        .setOperations([OperationType.Create])
        .setResourceId(organization._id)
        .setResourceType(ResourceType.Organization)
        .setRestricted()
        .build();
    let userPermission = new PermissionBuilder()
        .setOperations([OperationType.Any])
        .setResourceId(user._id)
        .setResourceType(ResourceType.User)
        .setRestricted()
        .build();
    let userPermissionSet = new PermissionSetModel({
        name: `User:${user._id}`
    })
    permissionSet = new PermissionSetModel({
        name: `student`
    });
    await Promise.all([
        permissionSet.addPermission(permission),
        userPermissionSet.addPermission(userPermission),
        organization.addPermissionSet(permissionSet),
        user.addPermissionSet(permissionSet),
    ])
    await user.save()
    await user.addPermissionSet(userPermissionSet)
    await Promise.all([
        user.save(),
        permission.save(),
        permissionSet.save(),
        organization.save(),
        building.save(),
        userPermission.save(),
        userPermissionSet.save()
    ])
    jwt = jsonwebtoken.sign({
        _id: user._id
    }, process.env.ACCESS_TOKEN_SECRET)
})

afterEach(async () => {
    await TestDatabase.clearDatabase()
    jest.clearAllMocks();
});

afterAll(async () => await TestDatabase.closeDatabase());

describe("Check In Routes Suite", () => {
    describe("Create Check In Event Route", () => {
        test("A check in request with a missing building field", async () => {
            const response = await request(app).post("/api/check_in")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    organizationId: organization.organizationId,
                });

            expectErrorResponse(response, [
                "\"building\" is required"
            ]);
            expectStatusCode(response, 400);
        });

        test("A successful check in", async () => {
            const response = await request(app).post("/api/check_in")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    organizationId: organization.organizationId,
                    building: building.name
                });

            expect(response.body.data.organizationId).toEqual(organization.organizationId)
            expectStatusCode(response, 200);
        })
    });
});