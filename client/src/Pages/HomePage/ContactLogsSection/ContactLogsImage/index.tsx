import React from "react";
import "./index.css";

export default class ContactLogsImage extends React.Component {
    render() {
        return (
            <picture className="contact-us-image">
                <source srcSet="contactus.webp" type="image/webp"/>
                <source srcSet="contactus.jpg" type="image/jpeg"/> 
                <img alt="Our contact log application displayed on an IPhone that is on top of a stone on a green background" className="contact-us-image" src="./contactus.png"/>
            </picture>
        )
    }
}