import React from "react";
import LegalFooter from "../../../Layouts/Components/LegalFooter";
import "./index.css";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-container">
                <LegalFooter />
            </footer>
        )
    }
}