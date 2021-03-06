import React from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import ITimeInputProps from "./ITimeInputProps";
import ITimeInputState from "./ITimeInputState";
import moment from "moment";
import IFormValue from "../FormInput/IFormValue";

export default class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {
    constructor(props: ITimeInputProps) {
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
                name="time"
                iconColor={this.props.iconColor}
                id={this.props.id}
                onChange={this.handleTimeChange}
                hoverColor={this.props.hoverColor}
                icon={IconType.Clock} 
                dark={this.props.dark}
                label="Time of Entry" 
                placeHolder="Enter time" 
                type="time" />
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

    private asyncSetState(state : ITimeInputState) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }

    private validateDate(date: string) {
        return moment(date, "h:mm A", true).isValid() && 
                date.toLowerCase().endsWith("m")
    }
}