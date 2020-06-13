import IPermission from "../../models/Permission/IPermission";

export default interface IPermissionBuilder {
    setResourceId(id: string) : IPermissionBuilder;
    build() : IPermission;
}