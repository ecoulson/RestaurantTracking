import React from "react";
import "./index.css";
import ContactLogsTitle from "./ContactLogsTitle";

export default class ContactLogsSection extends React.Component {
    render() {
        return (
            <div className="contact-logs-section">
                <div className="contact-logs-section-wrapper">
                    <ContactLogsTitle />
                </div>
            </div>
        )
    }
}