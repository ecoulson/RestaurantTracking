import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class CheckInFooter extends React.Component {
    render() {
        return (
            <p className="check-in-footer">
                View our <Link className="check-in-footer-link" to="/legal/privacy-policy">Privacy Policy</Link> and <Link className="check-in-footer-link" to="/legal/terms-and-conditions">Terms and Conditions</Link>
            </p>
        )
    }
}