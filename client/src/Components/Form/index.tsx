import React, { FormEvent } from "react";
import "./Form.css";
import IFormProps from "./IFormProps";
import FormSubmitting from "./FormSubmitting";

export default class Form extends React.Component<IFormProps> {
    constructor(props : IFormProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        if (this.props.isSubmitting) {
            return (
                <FormSubmitting />
            )
        } else {
            return (
                <form   
                    id={this.props.id ? this.props.id : ""}
                    onClick={this.props.onClick ? this.props.onClick : () => null} 
                    onSubmit={this.onSubmit}
                    className="form">
                    {this.props.children}
                </form>
            )
        }
    }

    private onSubmit(event : FormEvent) {
        event.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(event);
        }
    }
}