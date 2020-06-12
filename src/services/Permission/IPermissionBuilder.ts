import IPermission from "../../models/Permission/IPermission";

export default interface IPermissionBuilder {
    build() : IPermission
}