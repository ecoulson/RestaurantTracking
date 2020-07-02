import React from "react";

export default class LearnMoreNavLink extends React.Component {
    render() {
        return (
            <div className="learn-more-nav-link">{this.props.children}</div>
        )
    }
}