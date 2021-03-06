import React from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IDateInputProps from "./IDateInputProps";
import IDateInputState from "./IDateInputState";
import moment from "moment";
import IFormValue from "../FormInput/IFormValue";

export default class DateInput extends React.Component<IDateInputProps, IDateInputState> {
    constructor(props: IDateInputProps) {
        super(props);
        this.state = {
            date: "",
            valid: false 
        }

        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    render() {
        return (
            <FormInput
                value={this.state.date}
                isValid={this.state.valid}
                dark={this.props.dark}
                iconColor={this.props.iconColor}
                hoverColor={this.props.hoverColor}
                id={this.props.id}
                name="date"
                onChange={this.handleTimeChange}
                icon={IconType.Calendar} 
                label="Date of Entry" 
                placeHolder="Enter date" 
                type="date" />
        )
    }

    private async handleTimeChange(date : IFormValue<string>) {
        await this.asyncSetState({
            date: date.value,
            valid: this.validateDate(date.value)
        })
        this.props.onChange({
            valid: this.state.valid,
            value: this.state.date
        })
    }

    private asyncSetState(state : IDateInputState) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }

    private validateDate(date: string) {
        return moment(date, "Y-M-D", true).isValid()
    }
}