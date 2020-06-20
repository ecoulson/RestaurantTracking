import React from "react";
import "./index.css";
import IWidgetProps from "./IWidgetProps";

export default class Widget extends React.Component<IWidgetProps> {
    render() {
        return (
            <div className={`widget-container ${this.getColSize()} ${this.getRowSize()}`}>
                {this.props.children}
            </div>
        )
    }

    private getColSize() {
        return `col-${this.props.columns}`;
    }

    private getRowSize() {
        return `row-${this.props.rows}`;
    }
}