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

export default class AuthorizationMiddleware implements IAuthorizationMiddleware {
    authorize(operation : OperationType, getResources : GetResourceIdsFunction) {
        return async (request : Request, response : Response, next : NextFunction) => {
            const permissionSets = await this.getPermissionSets(request.user);
            const resourceRequests = getResources(request);
            for (const resourceRequest of resourceRequests) {
                for (const permissionSet of permissionSets) {
                    const isAuthorized = await this.checkPermissionSet(
                        permissionSet, 
                        request.user,
                        resourceRequest
                    )
                    if (isAuthorized) {
                        return next();
                    }
                }
            }
            return new ForbiddenResponse(response).send();
        }
    }

    private getPermissionSets(user : IUser) {
        return Promise.all(user.permissionSets.map((permissionSetId : string) => {
            return PermissionSetModel.findById(permissionSetId);
        }));
    }

    private async checkPermissionSet(
        permissionSet : IPermissionSet, 
        user : IUser, 
        resourceRequest : IResourceRequest
    ) {
        const permissions = await this.getPermissions(permissionSet);
        for (const permission of permissions) {
            if (!permission.restricted) {
                if (permission.operations.includes(OperationType.Any)) {
                    return true;
                }
            } else {
                if (permission.resourceId === resourceRequest.id) {
                    if (permission.operations.includes(OperationType.Any)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private getPermissions(permissionSet : IPermissionSet) {
        return Promise.all(permissionSet.permissions.map((permissionId : string) => {
            return PermissionModel.findById(permissionId);
        }))
    }
}