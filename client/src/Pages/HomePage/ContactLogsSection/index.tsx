import React from "react";
import "./index.css";
import ContactLogsTitle from "./ContactLogsTitle";
import ContactLogsImage from "./ContactLogsImage";
import ContactLogsParagraph from "./ContactLogsParagraph";

export default class ContactLogsSection extends React.Component {
    render() {
        return (
            <div className="contact-logs-section">
                <div className="contact-logs-section-wrapper">
                    <ContactLogsTitle />
                    <div className="contact-logs-content">
                        <ContactLogsParagraph />
                        <ContactLogsImage />
                    </div>
                </div>
            </div>
        )
    }
}