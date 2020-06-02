import React, { ChangeEvent } from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import ITimeInputProps from "./ITimeInputProps";
import ITimeInputState from "./ITimeInputState";
import moment from "moment";

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
                onChange={this.handleTimeChange}
                icon={IconType.Clock} 
                label="Time of Entry" 
                placeHolder="MM/DD/YYYY hh:mm AM/PM" 
                type="text" />
        )
    }

    private handleTimeChange(event : ChangeEvent) {
        let rawDate = (event.target as HTMLInputElement).value;
        this.setState({
            date: rawDate,
            valid: moment(rawDate, "M/D/Y h:mm A", true).isValid() && rawDate.toLowerCase().endsWith("m")
        }, () => {
            this.props.onChange({
                valid: this.state.valid,
                time: this.state.date
            })
        })
    }
}