import IUser from "../../models/User/IUser";

export default interface ISyncCheckInsService {
    syncCheckIns(userToSync : IUser, username: string, password: string, organizationId: string) : Promise<string>
}