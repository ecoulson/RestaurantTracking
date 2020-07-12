import React from "react";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import "./index.css";

export default class HeroScrollArrow extends React.Component {
    render() {
        return (
            <div className="hero-scroll-arrow">
                <Icon icon={IconType.ChevronDown} color="white" width={70} height={50} />
            </div>
        )
    }
}