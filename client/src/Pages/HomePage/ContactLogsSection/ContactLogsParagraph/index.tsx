import React from "react";
import "./index.css";
import SimpleButton from "../../../../Components/SimpleButton";

export default class ContactLogsParagraph extends React.Component {
    render() {
        return (
            <div className="contact-logs-paragraph-container">
                <p className="contact-logs-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl ex, ullamcorper eu justo vitae, ornare egestas odio. Proin et velit lacus. Quisque porta nisi turpis, quis pharetra lorem bibendum vel. Etiam in euismod purus, a consequat lectus. In id ornare lacus. Donec ac sodales enim. Nam sapien nisi, aliquet a elit vel, tristique molestie ex. Donec gravida pharetra mi vitae malesuada.
                </p>
                <p className="contact-logs-paragraph">
                    Mauris pretium dui nec aliquam sagittis. Vestibulum cursus lorem pretium sapien molestie consectetur. Proin vitae erat nec augue consequat tempor. Praesent non nisl felis. Donec pulvinar nulla eget mauris porttitor, nec tempus felis sagittis. Nulla quis felis ac justo tincidunt mollis placerat vel risus. Nullam posuere dolor a massa fringilla consectetur.
                </p>
                <SimpleButton to="/learn-more/contact-logs">Learn More</SimpleButton>
            </div>
        )
    }
}