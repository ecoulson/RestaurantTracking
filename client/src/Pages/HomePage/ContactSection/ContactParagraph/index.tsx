import React from "react";
import "./index.css";
import SimpleButton from "../../../../Components/SimpleButton";

export default class ContactParagraph extends React.Component {
    render() {
        return (
            <div className="contact-paragraph-container">
                <p className="contact-paragraph">
                    We work with COVID-19 related record systems. Our products and services empower you to prevent and stop the spread of COVID-19. 
                </p>
                <p className="contact-paragraph">
                    If one of our products interests you and your team, or you have an idea for something you need, please feel free to contact us.
                </p>
                <SimpleButton email="communications@adaptsolutions.tech" center>Contact Us</SimpleButton>
            </div>
        )
    }
}