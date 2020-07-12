import React from "react";
import "./index.css";
import HeroLogo from "./HeroLogo";
import HeroTitle from "./HeroTitle";
import HeroMenu from "./HeroMenu";
import SimpleButton from "../../../Components/SimpleButton";
import HeroInfo from "./HeroInfo";
import HeroScrollArrow from "./HeroScrollArrow";

export default class Hero extends React.Component {
    render() {
        return (
            <div className="hero">
                <HeroLogo />
                <HeroTitle />
                <HeroMenu />
                <div className="hero-container">
                    <HeroInfo />
                    <SimpleButton to="/login">See Our Work</SimpleButton>
                </div>
                <HeroScrollArrow />
            </div>
        )
    }
}