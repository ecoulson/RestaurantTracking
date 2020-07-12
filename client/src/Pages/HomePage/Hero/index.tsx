import React from "react";
import "./index.css";
import HeroLogo from "./HeroLogo";
import HeroTitle from "./HeroTitle";
import HeroMenu from "./HeroMenu";

export default class Hero extends React.Component {
    render() {
        return (
            <div className="hero">
                <HeroLogo />
                <HeroTitle />
                <HeroMenu />
            </div>
        )
    }
}