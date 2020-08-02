import React from "react";
import "./index.css";
import HeroLogo from "./HeroLogo";
import HeroTitle from "./HeroTitle";
import SimpleButton from "../../../Components/SimpleButton";
import HeroInfo from "./HeroInfo";
import HeroScrollArrow from "./HeroScrollArrow";
import HeroMenu from "./HeroMenu";

export default class Hero extends React.Component {
    render() {
        return (
            <div className="hero">
                <HeroLogo />
                <HeroTitle />
                <HeroMenu />
                <div className="hero-container">
                    <HeroInfo />
                    <SimpleButton center to="/register">Create Account</SimpleButton>
                </div>
                <HeroScrollArrow />
            </div>
        )
    }
}