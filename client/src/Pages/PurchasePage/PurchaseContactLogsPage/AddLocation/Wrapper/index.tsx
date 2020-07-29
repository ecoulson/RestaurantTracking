import React from "react";

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className="contact-log-wrapper">
                <h1>Add a Contact Log Location</h1>
                <div className="contact-log-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}