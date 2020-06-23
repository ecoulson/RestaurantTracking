import IPermissionSet from "../../models/PermissionSet/IPermissionSet";

export default interface IPermissionSetService {
    create(name : string) : Promise<IPermissionSet>
}