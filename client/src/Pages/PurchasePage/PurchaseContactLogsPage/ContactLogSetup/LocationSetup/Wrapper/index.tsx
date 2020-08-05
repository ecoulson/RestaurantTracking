import React from "react";

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className="contact-log-wrapper">
                <h1 className="contact-log-title">Add a Contact Log Location</h1>
                <p className="contact-log-description">
                    The location name will appear on the display.
                </p>
                <div className="contact-log-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}