import React from "react";

export default class MenuItem extends React.Component {
    render() {
        return (
            <p className="menu-item">{this.props.children}</p>
        )
    }
}