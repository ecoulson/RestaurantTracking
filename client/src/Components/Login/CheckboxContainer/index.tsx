import React from "react";

export default class CheckboxContainer extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", width: "50%" }}>
                {this.props.children}
            </div>
        )
    }
}