import React from "react";
import "./index.css";
import Logo from "../../../../Components/Logo";

export default class HeroLogo extends React.Component {
    render() {
        return (
            <div className="hero-logo-container">
                <Logo dark noTitle />
            </div>
        )
    }
}