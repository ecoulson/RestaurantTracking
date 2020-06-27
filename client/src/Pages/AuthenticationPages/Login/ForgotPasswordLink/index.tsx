import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class ForgotPasswordLink extends React.Component {
    render() {
        return (
            <Link className="forgot-password-link" to="/forgot-password">Forgot password?</Link>
        )
    }
}