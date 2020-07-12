import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class LegalFooter extends React.Component {
    render() {
        return (
            <footer className="legal-footer">
                <Link className="legal-footer-link" to="/legal/privacy-policy">Privacy Policy</Link>
                <Link className="legal-footer-link" to="/legal/terms-and-conditions">Site Terms</Link>
            </footer>
        )
    }
}