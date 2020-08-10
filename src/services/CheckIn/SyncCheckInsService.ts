import ISyncCheckInsService from "./ISyncCheckInsService";
import IUser from "../../models/User/IUser";
import IAuthenticationService from "../Authentication/IAuthenticationService";
import LoginArguments from "../Authentication/LoginArguments";
import CheckInBroker from "../../brokers/CheckInBroker";
import PermissionBroker from "../../brokers/PermissionBroker";
import PermissionSetBroker from "../../brokers/PermissionSetBroker";
import UserBroker from "../../brokers/UserBroker";
import ICheckIn from "../../models/CheckIn/ICheckIn";

export default class SyncCheckInsService implements ISyncCheckInsService {
    private authenticationService : IAuthenticationService;
    private checkInBroker : CheckInBroker;
    private permissionBroker : PermissionBroker
    private permissionSetBroker : PermissionSetBroker;
    private userBroker : UserBroker;

    constructor(
        authenticationService : IAuthenticationService, 
        checkInBroker : CheckInBroker,
        permissionBroker : PermissionBroker,
        permissionSetBroker : PermissionSetBroker,
        userBroker : UserBroker
    ) {
        this.authenticationService = authenticationService;
        this.checkInBroker = checkInBroker;
        this.permissionBroker = permissionBroker;
        this.permissionSetBroker = permissionSetBroker;
        this.userBroker = userBroker;
    }

    async syncCheckIns(userToSync: IUser, username: string, password: string, organizationId: string) {
        const userToUpdate = await this.authenticationService
            .login(new LoginArguments(username, password));

        const checkInsOrAccessToken = await this.syncCheckInDocuments(
            userToSync, userToUpdate, organizationId
        )
        // If there are no check ins an access token will be returned
        // This prevents additional queries running.
        if (checkInsOrAccessToken.token) {
            return checkInsOrAccessToken.token; // access token
        }
        const { checkIns } = checkInsOrAccessToken;
        await this.syncPermissions(checkIns, userToUpdate);
        await this.removeUserToSync(userToSync);
        return this.authenticationService.generateAccessToken(userToUpdate, true);
    }

    private async syncCheckInDocuments(
        userToSync : IUser, userToUpdate : IUser, organizationId : string
    ) {
        let checkIns = await this.getCheckIns(userToSync, organizationId);
        if (this.noCheckInsToSync(checkIns)) {
            return {
                token: await this.handleEmptySync(userToSync, userToUpdate),
                checkIns: [] as ICheckIn[]
            }
        }
        return {
            checkIns: await this.updateCheckIns(checkIns, userToUpdate),
            token: null
        }
    }

    private async getCheckIns(userToSync : IUser, organizationId: string) {
        return await this.checkInBroker
            .getUserCheckIns(userToSync.id, { organizationId });
    }

    private noCheckInsToSync(checkIns: ICheckIn[]) {
        return checkIns.length === 0;
    }

    private async handleEmptySync(userToSync : IUser, userToUpdate : IUser) {
        await this.userBroker.delete(userToSync);
        return this.authenticationService.generateAccessToken(userToUpdate, true);
    }

    private async updateCheckIns(checkIns : ICheckIn[], userToUpdate : IUser) {
        const updatedCheckIns = checkIns.map(checkIn => {
            checkIn.userId = userToUpdate.id;
            return checkIn;
        });
        return await Promise.all(
            updatedCheckIns.map(checkIn => this.checkInBroker.save(checkIn))
        );
    }

    private async syncPermissions(checkIns: ICheckIn[], userToUpdate: IUser) {
        const permissions = await this.getCheckInPermissions(checkIns);
        const userPermissionSet = await this.getUserPermissionSet(userToUpdate)
        await Promise.all(
            permissions.map(
                permission => userPermissionSet.addPermission(permission)
            )
        )
    }

    private async getCheckInPermissions(checkIns : ICheckIn[]) {
        return await Promise.all(
            checkIns.map(
                checkIn => this.getPermissionByResourceId(checkIn.id)
            )
        );
    }

    private async getPermissionByResourceId(id: string) {
        const permission = await this.permissionBroker.findOneByResourceId(id)
        if (!permission) {
            throw new Error(
                `No permission for resource with id: ${id}`
            )
        }
        return permission;
    }

    private async getUserPermissionSet(user : IUser) {
        const userPermissionSet = await this.permissionSetBroker
            .findByName(`User:${user.id}`);
        if (!userPermissionSet) {
            throw new Error(`No permission set for user ${user._id}`)
        }
        return userPermissionSet;
    }

    private async removeUserToSync(userToSync : IUser) {
        const userPermissionToDelete = 
            await this.getPermissionByResourceId(userToSync.id);
        const userPermissionSetToDelete = 
            await this.getUserPermissionSet(userToSync) 
        await Promise.all([
            this.permissionBroker.remove(userPermissionToDelete),
            this.permissionSetBroker.delete(userPermissionSetToDelete),
            this.userBroker.delete(userToSync)
        ])
    }
}