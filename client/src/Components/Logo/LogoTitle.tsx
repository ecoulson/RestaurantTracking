import React from "react";
import "./LogoTitle.css"
import ILogoTitleProps from "./ILogoTitleProps";

export default class LogoTitle extends React.Component<ILogoTitleProps> {
    render() {
        return (
            <h3 className={`logo-title ${this.getThemeClass()} ${this.getDirectionClass()} ${this.getCollapsedClass()}`}>
                <span className="logo-title-top">Adapt</span><br/> 
                <span className="logo-title-bottom">Solutions</span>
            </h3>
        )
    }

    private getThemeClass() {
        if (this.props.dark) {
            return "logo-title-dark"
        } else {
            return "logo-title-light"
        }
    }

    private getDirectionClass() {
        return this.props.horizontal ?
            "logo-title-horizontal" : ""
    }

    private getCollapsedClass() {
        return this.props.collapsed ?
            "logo-title-collapsed" : ""
    }
}