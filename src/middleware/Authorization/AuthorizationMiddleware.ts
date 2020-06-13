import IAuthorizationMiddleware from "./IAuthorizationMiddleWare";
import { Request, Response, NextFunction } from "express";
import GetResourceIdsFunction from "../../lib/Authorization/GetResourceIdsFunction";
import OperationType from "../../lib/Authorization/OperationType";
import IUser from "../../models/user/IUser";
import PermissionSetModel from "../../models/PermissionSet/PermissionSetModel";
import IPermissionSet from "../../models/PermissionSet/IPermissionSet";
import PermissionModel from "../../models/Permission/PermissionModel";
import ForbiddenResponse from "../../lib/HTTP/ForbiddenResponse";
import IResourceRequest from "../../lib/Authorization/IResourceRequest";
import IPermission from "../../models/Permission/IPermission";

export default class AuthorizationMiddleware implements IAuthorizationMiddleware {
    authorize(operation : OperationType, getResources : GetResourceIdsFunction) {
        return async (request : Request, response : Response, next : NextFunction) => {
            const resourceRequests = getResources(request);
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

    private getPermissionSets(user : IUser) {
        return PermissionSetModel.find({ _id : { $in : user.permissionSets } })
    }

    private getAllPermissions(permissionSets : IPermissionSet[]) {
        return permissionSets.reduce((permissions : string[], set : IPermissionSet) => {
            return permissions.concat(set.permissions)
        }, []);
    }

    private async checkPermissions(
        permissionIds : string[], 
        operation : OperationType, 
        resourceRequest : IResourceRequest
    ) {
        const permissions = await this.getPermissions(permissionIds);
        for (const permission of permissions) {
            if (this.hasUnrestrictedAccess(permission, operation)) {
                return true;
            } 
            if (this.hasRestrictedAccess(permission, operation, resourceRequest)) {
                return true;
            }
        }
        return false;
    }

    private getPermissions(permissionIds : string[]) {
        return PermissionModel.find({ _id : { $in: permissionIds }})
    }

    private hasUnrestrictedAccess(permission : IPermission, operation : OperationType) {
        return !permission.restricted && 
                (permission.operations.includes(OperationType.Any) || 
                permission.operations.includes(operation))
    }

    private hasRestrictedAccess(permission : IPermission, operation : OperationType, resourceRequest : IResourceRequest) {
        return permission.restricted && 
                permission.resourceId === resourceRequest.id && 
                (permission.operations.includes(OperationType.Any) || 
                permission.operations.includes(operation))
    }
}