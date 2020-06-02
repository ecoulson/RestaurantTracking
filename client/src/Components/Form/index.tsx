import React from "react";
import "./Form.css";
import IFormProps from "./IFormProps";

export default class Form extends React.Component<IFormProps> {
    render() {
        return (
            <form 
                onClick={this.props.onClick ? this.props.onClick : () => null} 
                className="form"
                >
                {this.props.children}
            </form>
        )
    }
}