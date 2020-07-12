import React from "react";
import "./index.css";
import SimpleButton from "../../../../Components/SimpleButton";

export default class ContactParagraph extends React.Component {
    render() {
        return (
            <div className="contact-paragraph-container">
                <p className="contact-paragraph">
                    With uncertainty at an all time high and cashflow at an all-time low, we strive to provide the highest quality solutions at the <b>lowest possible solutions</b>
                </p>
                <p className="contact-paragraph">
                    Whether one of our products interests you and your team, or you have an idea for something you need, please feel free to
                </p>
                <SimpleButton>Contact Us</SimpleButton>
            </div>
        )
    }
}