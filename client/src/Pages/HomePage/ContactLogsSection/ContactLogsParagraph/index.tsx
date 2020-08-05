import React from "react";
import "./index.css";
import SimpleButton from "../../../../Components/SimpleButton";

export default class ContactLogsParagraph extends React.Component {
    render() {
        return (
            <div className="contact-logs-paragraph-container">
                <p className="contact-logs-paragraph">
                    We work with COVID-19 related record systems. Our products and services empower you to prevent and stop the spread of COVID-19.
                </p>
                <p className="contact-logs-paragraph">
                    We offer touch-free check-ins for buildings and rooms. We are committed to working with you to provide quality displays and custom branding. Our displays employ NFC technology for streamlined check-in.
                </p>
                <SimpleButton to="/learn-more/check-ins">Visitor Management</SimpleButton>
            </div>
        )
    }
}