import IDashboardLinkData from "./IDashboardLinkData";
import IconType from "../../../../Components/Icon/IconTypes";

const DashboardLinksData : IDashboardLinkData[] = [
    {
        icon: IconType.Dashboard,
        iconColor: "#CFD0D3",
        text: "Dashboard",
        to: "/dashboard"
    },
    {
        icon: IconType.Shopping,
        iconColor: "#CFD0D3",
        text: "Marketplace",
        to: "/marketplace"
    }
]

export default DashboardLinksData;