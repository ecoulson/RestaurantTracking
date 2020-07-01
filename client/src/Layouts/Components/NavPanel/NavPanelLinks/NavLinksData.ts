import INavLinkData from "./INavLinkData";
import IconType from "../../../../Components/Icon/IconTypes";

const NavLinksData : INavLinkData[] = [
    {
        icon: IconType.Dashboard,
        iconColor: "#CFD0D3",
        text: "Dashboard",
        to: "/dashboard",
        hoverColor: "white"
    },
    {
        icon: IconType.Shopping,
        iconColor: "#CFD0D3",
        text: "Marketplace",
        to: "/marketplace",
        hoverColor: "white"
    }
]

export default NavLinksData;