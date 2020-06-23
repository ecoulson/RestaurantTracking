import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class LoginLink extends React.Component {
    render() {
        return (
            <Link className="user-register-link" to="/login">Login</Link>
        )
    }
}