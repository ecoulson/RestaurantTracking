import React from "react";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import "./index.css";
import IHeroMenuProps from "./IHeroMenuProps";

export default class HeroMenu extends React.Component<IHeroMenuProps> {
    render() {
        return (
            <div className="hero-menu">
                <Icon 
                    onClick={this.props.onClick} 
                    width={70} 
                    height={70} 
                    icon={IconType.HamburgerMenu} 
                    color="#FFFFFF"/>
            </div>
        )
    }
}