import { AppType } from "../../../Store/Cart/types";

export default interface IAppIsActiveProps {
    appType: AppType;
    organizationId: string;
}