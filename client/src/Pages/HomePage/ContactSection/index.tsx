import React from "react";
import "./index.css";
import ContactTitle from "./ContactTitle";
import ContactParagraph from "./ContactParagraph";

export default class ContactSection extends React.Component {
    render() {
        return (
            <div className="contact-section">
                <div className="contact-section-container">
                    <ContactTitle />
                    <div className="contact-content">
                        <ContactParagraph />
                    </div>
                </div>
            </div>
        )
    }
}