import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import IMenuProps from "./IMenuProps";
import IMenuState from "./IMenuState";

export default class AuthenticationMenu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);
        this.state = {
            hasRendered: false
        }
    }

    render() {
        return (
            <div className={`home-menu ${this.getClass()}`}>
                <div className="home-menu-container">
                    <Link className="home-menu-link" to="/">Home</Link>
                    <Link className="home-menu-link" to="/register">Register</Link>
                    <Link className="home-menu-link" to="/login">Login</Link>
                    <Link className="home-menu-link" to="/verify">Verify Account</Link>
                    <Link className="home-menu-link" to="/forgot-password">Forgot Password</Link>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.hasRendered || this.props.isVisible) {
            if (!this.state.hasRendered) {
                this.setState({
                    hasRendered: true
                })
            }
        }
    }

    getClass() {
        if (this.state.hasRendered) {
            return this.props.isVisible ?
                "home-menu-show" :
                "home-menu-hide"
        }
        return "";
    }
}