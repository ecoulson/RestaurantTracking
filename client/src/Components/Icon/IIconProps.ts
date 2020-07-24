import IconType from "./IconTypes";

export default interface IIconProps {
    icon: IconType;
    className?: string;
    color?: string;
    width?: number;
    height?: number;
    hoverColor?: string;
    hovered?: boolean;
    onClick?: () => void
}