import React from "react";
import "./index.css";
import IWidgetProps from "./IWidgetProps";

export default class Widget extends React.Component<IWidgetProps> {
    render() {
        return (
            <div id={`widget-${this.props.id}`} className={`widget-container ${this.getColSize()} ${this.getRowSize()}`}>
                {this.props.children}
            </div>
        )
    }

    private getColSize() {
        return this.props.columns ?
            `col-${this.props.columns}`:
            `col-fill`
    }

    private getRowSize() {
        return this.props.rows ?
            `row-${this.props.rows}` :
            `row-fill`;
    }
}