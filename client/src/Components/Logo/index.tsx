import React from "react";
import DarkLogo from "./dark-logo.svg";
import LightLogo from "./light-logo.png";
import "./Logo.css";
import LogoTitle from "./LogoTitle";
import ILogoProps from "./ILogoProps";

export default class Logo extends React.Component<ILogoProps> {
    render() {
        return (
            <>
                <img 
                    className={`company-name ${this.getThemeClass()}`} 
                    src={this.getLogo()} 
                    alt="Adapt soltuions logo" 
                />
                <LogoTitle dark={this.props.dark}/>
            </>
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
}