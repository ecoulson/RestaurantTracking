import INavLinkData from "./INavLinkData";
import IconType from "../../../../Components/Icon/IconTypes";

const NavLinksData : INavLinkData[] = [
    {
        icon: IconType.Dashboard,
        iconColor: "#b1b1b3",
        text: "Dashboard",
        to: "/dashboard",
        hoverColor: "white"
    },
    {
        icon: IconType.Shopping,
        iconColor: "#b1b1b3",
        text: "Marketplace",
        to: "/marketplace",
        hoverColor: "white"
    }
]

export default NavLinksData;