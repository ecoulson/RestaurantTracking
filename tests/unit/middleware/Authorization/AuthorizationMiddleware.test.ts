import AuthorizationMiddleware from "../../../../src/middleware/Authorization/AuthorizationMiddleware"
import { mockRequest, mockResponse } from "mock-req-res"
import OperationType from "../../../../src/lib/Authorization/OperationType"
import UserGenerator from "../../../mocks/Generators/UserGenerator"
import PermissionSetModel from "../../../../src/models/PermissionSet/PermissionSetModel";
import ResourceRequest from "../../../../src/lib/Authorization/ResourceRequest";
import ResourceType from "../../../../src/lib/Authorization/ResourceType";
import PermissionModel from "../../../../src/models/Permission/PermissionModel";

const userGenerator = new UserGenerator();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Authorization Middleware Suite", () => {
    describe("authorize", () => {
        test("Fails to get permission sets", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockRejectedValue(new Error())

            try {
                await middleware.authorize(OperationType.Any, async () => [])(request, response, () => {})
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to find permission sets for user ${user.id}`)
                );
            }
            expect.assertions(1);
        })

        test("Does not have permission to preform operation", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getUnrestrictedPermission([
                OperationType.Read
            ], ResourceType.User)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("test", ResourceType.User)
            ])(request, response, () => {})

            expect(response.status).toHaveBeenCalledWith(403);
        })

        test("Does not have permission to preform operation on resource type", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getUnrestrictedPermission([
                OperationType.Create
            ], ResourceType.Restaurant)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("", ResourceType.User)
            ])(request, response, () => {})

            expect(response.status).toHaveBeenCalledWith(403);
        })

        test("Has unrestricted access to resource type", async (done) => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getUnrestrictedPermission([
                OperationType.Create
            ], ResourceType.User)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("", ResourceType.User)
            ])(request, response, () => {
                done()
            })
        })

        test("Does not have access to resource id", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getRestrictedPermission("", [
                OperationType.Create
            ], ResourceType.User)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("test", ResourceType.User)
            ])(request, response, () => {})

            expect(response.status).toHaveBeenCalledWith(403);
        })

        test("Does not have access to resource type", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getRestrictedPermission("test", [
                OperationType.Create
            ], ResourceType.Restaurant)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("test", ResourceType.User)
            ])(request, response, () => {})

            expect(response.status).toHaveBeenCalledWith(403);
        })

        test("Does not have access to operation", async () => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getRestrictedPermission("test", [
                OperationType.Read
            ], ResourceType.User)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("test", ResourceType.User)
            ])(request, response, () => {})

            expect(response.status).toHaveBeenCalledWith(403);
        })

        test("Has restricted access", async (done) => {
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const permissionSet = new PermissionSetModel({ name: "set" });
            const permission = getRestrictedPermission("test", [
                OperationType.Create
            ], ResourceType.User)
            const response = mockResponse();
            const middleware = new AuthorizationMiddleware();
            PermissionSetModel.find = jest.fn().mockResolvedValue([
                permissionSet
            ])
            PermissionModel.find = jest.fn().mockResolvedValue([
                permission
            ])

            await middleware.authorize(OperationType.Create, async () => [
                new ResourceRequest("test", ResourceType.User)
            ])(request, response, () => {
                done()
            })
        })
    })
})

function getUnrestrictedPermission(operations : OperationType[], resourceType : ResourceType) {
    return new PermissionModel({
        restricted: false,
        operations,
        resourceType
    })
}

function getRestrictedPermission(resourceId: string, operations : OperationType[], resourceType : ResourceType) {
    return new PermissionModel({
        resourceId,
        restricted: true,
        operations,
        resourceType
    })
}