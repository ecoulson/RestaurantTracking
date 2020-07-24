import React from "react";
import IconMapping from "./IconMapping";
import IFormIconProps from "./IIconProps";
import "./Icon.css";
import IconFillSet from "./IconFillSet";

export default class Icon extends React.Component<IFormIconProps> {
    render() {
        return this.getIcon()
    }

    private getIcon() {
        const color = this.props.color ? this.props.color : "";
        const SelectedIcon = IconMapping.get(this.props.icon)
        if (IconFillSet.has(this.props.icon)) {
            return (
                <SelectedIcon onClick={this.props.onClick} style={this.getStyle()} fill={color} stroke="none" className="icon"/>
            )
        } else {
            return (
                <SelectedIcon onClick={this.props.onClick} style={this.getStyle()} fill="none" stroke={color} className="icon"/>
            )
        }
    }

    private getStyle() {
        return {
            ...this.getHoverStyle(),
            ...this.getSizeStyle()
        }
    }

    private getHoverStyle() {
        if (this.props.hovered && this.props.hoverColor) {
            if (IconFillSet.has(this.props.icon)) {
                return {
                    fill: this.props.hoverColor
                }
            } else {
                return {
                    stroke: this.props.hoverColor
                }
            }
        } else {
            return {};
        }
    }

    private getSizeStyle() {
        if (this.props.width && this.props.height) {
            return {
                width: this.props.width,
                height: this.props.height
            }
        }
        if (this.props.width) {
            return { width: this.props.width }
        }
        if (this.props.height) {
            return { height: this.props.height }
        }
    }
}