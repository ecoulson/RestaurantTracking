import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class LegalContainer extends React.Component {
    render() {
        return (
            <p className="legal-container">
                View our <Link className="legal-link" to="/privacy">Privacy Policy</Link> and <Link className="legal-link" to="/terms-and-condition">Terms and Conditions</Link>
            </p>
        )
    }
}