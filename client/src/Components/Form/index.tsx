import React from "react";
import "./Form.css";
import IFormProps from "./IFormProps";
import FormSubmitting from "./FormSubmitting";

export default class Form extends React.Component<IFormProps> {
    render() {
        if (this.props.isSubmitting) {
            return (
                <FormSubmitting />
            )
        } else {
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
}