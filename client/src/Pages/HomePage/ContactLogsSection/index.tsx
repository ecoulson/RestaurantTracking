import React from "react";
import "./index.css";
import ContactLogsTitle from "./ContactLogsTitle";
import ContactParagraph from "../ContactSection/ContactParagraph";
import ContactLogsParagraph from "./ContactLogsParagraph";

export default class ContactLogsSection extends React.Component {
    render() {
        return (
            <div className="contact-logs-section">
                <div className="contact-logs-section-wrapper">
                    <ContactLogsTitle />
                    <div className="contact-logs-content">
                        <ContactLogsParagraph />
                    </div>
                </div>
            </div>
        )
    }
}