import ISyncCheckInsService from "./ISyncCheckInsService";
import IUser from "../../models/User/IUser";
import IAuthenticationService from "../Authentication/IAuthenticationService";
import LoginArguments from "../Authentication/LoginArguments";
import CheckInBroker from "../../brokers/CheckInBroker";
import PermissionBroker from "../../brokers/PermissionBroker";
import PermissionSetBroker from "../../brokers/PermissionSetBroker";
import UserBroker from "../../brokers/UserBroker";

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
        const userToUpdate = await this.authenticationService.login(new LoginArguments(
            username, password
        ));

        let checkIns = await this.checkInBroker.getUserCheckIns(userToSync.id, { organizationId })
        checkIns = checkIns.map(x => {
            x.userId = userToUpdate.id;
            return x;
        })
        await Promise.all(checkIns.map(x => x.save()))

        const permissions = await Promise.all(checkIns.map((x) => this.permissionBroker.findOneByResourceId(x.id))); 
        const userPermissionSet = await this.permissionSetBroker.findByName(`User:${userToUpdate.id}`);
        await Promise.all(permissions.map(x => userPermissionSet.addPermission(x)))

        const userPermissionToDelete = await this.permissionBroker.findOneByResourceId(userToSync.id);
        const userPermissionSetToDelete = await this.permissionSetBroker.findByName(`User:${userToSync.id}`)
        await Promise.all([
            this.permissionBroker.remove(userPermissionToDelete),
            this.permissionSetBroker.delete(userPermissionSetToDelete),
            this.userBroker.delete(userToSync)
        ])

        return this.authenticationService.generateAccessToken(userToUpdate, true);
    }
}