import React from "react";
import "./index.css";
import CheckInHeaderTitle from "./CheckInHeaderTitle";
import Logo from "../../../Components/Logo";
import Icon from "../../../Components/Icon";
import IconType from "../../../Components/Icon/IconTypes";

export default class CheckInHeader extends React.Component {
    render() {
        return (
            <header className="check-in-header">
                <div className="check-in-header-element">
                    <Logo noTitle dark horizontal />
                </div>
                <div className="check-in-header-element">
                    <CheckInHeaderTitle />
                </div>
                <div className="check-in-header-element">
                    <Icon icon={IconType.HamburgerMenu} width={30} color="white" height={30} />
                </div>
            </header>
        )
    }
}