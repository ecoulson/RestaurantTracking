import React from "react";
import DarkLogo from "./dark-logo.svg";
import LightLogo from "./light-logo.png";
import "./Logo.css";
import LogoTitle from "./LogoTitle";
import ILogoProps from "./ILogoProps";

export default class Logo extends React.Component<ILogoProps> {
    render() {
        return (
            <div className={`${this.getLogoStyle()} ${this.getCollapsedClass()} `}>
                <img 
                    className={`company-name ${this.getThemeClass()} ${this.getLogoDirectionClass()} ${this.getCollapsedLogoClass()}`} 
                    src={this.getLogo()} 
                    alt="adapt solutions logo" 
                />
                <LogoTitle 
                    collapsed={this.props.collapsed} 
                    horizontal={this.props.horizontal} 
                    dark={this.props.dark}/>
            </div>
        )
    }

    private getLogo() {
        return this.props.dark ?
            DarkLogo : 
            LightLogo
    }

    private getThemeClass() {
        return this.props.dark ?
            "company-name-dark" :
            "company-name-light"
    }

    private getLogoStyle() {
        return this.props.horizontal ?
            "logo-horizontal-container" :
            "";
    }

    private getLogoDirectionClass() {
        return this.props.horizontal ?
            "logo-horizontal" : "";
    }

    private getCollapsedClass() {
        return this.props.collapsed ?
            "logo-collapsed-container" : "";
    }

    private getCollapsedLogoClass() {
        return this.props.collapsed ?
            "logo-collapsed" : ""
    }
}