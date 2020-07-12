import React from "react";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import "./index.css";

export default class HeroMenu extends React.Component {
    render() {
        return (
            <div className="hero-menu">
                <Icon width={70} height={70} icon={IconType.HamburgerMenu} color="#FFFFFF"/>
            </div>
        )
    }
}