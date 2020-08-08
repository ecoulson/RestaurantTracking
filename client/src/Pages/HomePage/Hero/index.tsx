import React from "react";
import "./index.css";
import HeroTitle from "./HeroTitle";
import SimpleButton from "../../../Components/SimpleButton";
import HeroInfo from "./HeroInfo";
import HeroScrollArrow from "./HeroScrollArrow";
import IHeroState from "./IHeroState";
import Menu from "./Menu";

const HeroLogo = React.lazy(() => import("./HeroLogo"));
const HeroMenu = React.lazy(() => import("./HeroMenu"));
// const Menu = React.lazy(() => import("./Menu"));

export default class Hero extends React.Component<{}, IHeroState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            isVisible: false,
            hasRendered: false
        }
    }

    render() {
        return (
            <div className={`hero ${this.getClass()}`}>
                {this.state.hasRendered ? <Menu isVisible={this.state.isVisible} /> : null}
                <HeroLogo />
                <HeroTitle />
                <HeroMenu onClick={() => this.setState({ isVisible: !this.state.isVisible })}/>
                <div className="hero-container">
                    <HeroInfo />
                    <SimpleButton center to="/register">Create Account</SimpleButton>
                </div>
                <HeroScrollArrow />
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.hasRendered || this.state.isVisible) {
            if (!this.state.hasRendered) {
                this.setState({
                    hasRendered: true
                })
            }
        }
    }

    getClass() {
        if (this.state.hasRendered) {
            return this.state.isVisible ?
                "hero-show" : "hero-hide"
        }
        return "";
    }
}