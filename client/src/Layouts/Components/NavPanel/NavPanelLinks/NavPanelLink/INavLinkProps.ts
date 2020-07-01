import IconType from "../../../../../Components/Icon/IconTypes";

export default interface INavLinkProps {
    icon: IconType;
    iconColor: string;
    to: string;
    collapsed: boolean;
    hoverColor: string;
}