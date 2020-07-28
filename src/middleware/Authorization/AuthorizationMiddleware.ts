import IAuthorizationMiddleware from "./IAuthorizationMiddleware";
import { Request, Response, NextFunction } from "express";
import GetResourceRequestsFunction from "../../lib/Authorization/GetResourceRequestsFunction";
import OperationType from "../../lib/Authorization/OperationType";
import IUser from "../../models/User/IUser";
import PermissionSetModel from "../../models/PermissionSet/PermissionSetModel";
import IPermissionSet from "../../models/PermissionSet/IPermissionSet";
import PermissionModel from "../../models/Permission/PermissionModel";
import ForbiddenResponse from "../../lib/HTTP/ForbiddenResponse";
import IResourceRequest from "../../lib/Authorization/IResourceRequest";
import IPermission from "../../models/Permission/IPermission";

export default class AuthorizationMiddleware implements IAuthorizationMiddleware {
    authorize(operation : OperationType, getResourceRequests : GetResourceRequestsFunction) {
        return async (request : Request, response : Response, next : NextFunction) => {
            const resourceRequests = await getResourceRequests(request);
            const userPermissionSets = await this.getPermissionSets(request.user);
            const userPermissionIds = this.getAllPermissions(userPermissionSets);
            for (const resourceRequest of resourceRequests) {
                const isAuthorized = await this.checkPermissions(userPermissionIds, operation, resourceRequest)
                if (!isAuthorized) {
                    return new ForbiddenResponse(response).send();
                }
            }
            return next();
        }
    }

    private async getPermissionSets(user : IUser) {
        try {
            return await PermissionSetModel.find({ _id : { $in : user.permissionSets } })
        } catch (error) {
            throw new Error(`Failed to find permission sets for user ${user.id}`);
        }
    }

    private getAllPermissions(permissionSets : IPermissionSet[]) {
        return permissionSets.reduce((permissions : string[], set : IPermissionSet) => {
            return [...permissions, ...set.permissions]
        }, []);
    }

    private async checkPermissions(
        permissionIds : string[], 
        operation : OperationType, 
        resourceRequest : IResourceRequest
    ) {
        const permissions = await this.getPermissions(permissionIds);
        for (const permission of permissions) {
            if (this.hasUnrestrictedAccess(permission, operation, resourceRequest)) {
                return true;
            } 
            if (this.hasRestrictedAccess(permission, operation, resourceRequest)) {
                return true;
            }
        }
        return false;
    }

    private async getPermissions(permissionIds : string[]) {
        try {
            return await PermissionModel.find({ _id : { $in: permissionIds }})
        } catch(error) {
            throw new Error(`Failed to get all of users permissions`);
        }
    }

    private hasUnrestrictedAccess(permission : IPermission, operation : OperationType, resourceRequest : IResourceRequest) {
        return !permission.restricted && 
                permission.resourceType === resourceRequest.type &&
                (permission.operations.includes(OperationType.Any) || 
                permission.operations.includes(operation))
    }

    private hasRestrictedAccess(permission : IPermission, operation : OperationType, resourceRequest : IResourceRequest) {
        return permission.restricted && 
                permission.resourceId.toString() === resourceRequest.id.toString() && 
                permission.resourceType === resourceRequest.type &&
                (permission.operations.includes(OperationType.Any) || 
                permission.operations.includes(operation))
    }
}