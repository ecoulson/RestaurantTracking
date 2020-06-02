import React from "react";
import logo from "./logo.svg";
import "./Logo.css";

export default class Logo extends React.Component {
    render() {
        return (
            <img className="company-name" src={logo} alt="Adapt soltuions logo" />
        )
    }
}