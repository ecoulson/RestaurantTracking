import React from "react";
import "./index.css";
import SimpleButton from "../../../../Components/SimpleButton";

export default class ContactLogsParagraph extends React.Component {
    render() {
        return (
            <div className="contact-logs-paragraph-container">
                <p className="contact-logs-paragraph">
                    Adapt Solutions offers touch-free check-ins for buildings and rooms. We are committed to working with you to provide quality displays and custom branding. Our displays employ NFC technology for streamlined check-in.
                </p>
                <p className="contact-logs-paragraph">
                    Individuals hover over our poster and will be directed to a page indicating that they can enter the building. We also have QRs incorporated on our poster offer an alternative to NFC chip usage and Bit.ly urls that direct individuals to pages manually.
                </p>
                <SimpleButton to="/learn-more/contact-logs">Learn More</SimpleButton>
            </div>
        )
    }
}