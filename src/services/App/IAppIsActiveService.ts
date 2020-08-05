import AppType from "../../models/App/AppType";

export default interface IAppIsActiveService {
    isActive(appType: AppType, organizationId: string) : Promise<boolean>
}