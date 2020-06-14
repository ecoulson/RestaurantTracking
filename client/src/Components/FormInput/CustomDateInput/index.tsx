import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "./CustomDateInput.css"
import "react-datepicker/dist/react-datepicker.css";
import IInputProps from "../Input/IInputProps";
import ICustomDateInputState from "./ICustomDateInputState";
 
export default class CustomDateInput extends React.Component<IInputProps, ICustomDateInputState> {
	constructor(props : IInputProps) {
		super(props);
		this.state = {
			value: null
		}
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<DatePicker
				className={`form-raw-input ${this.getThemeClass()} custom-date`}
				disabled={this.props.disabled}
				onFocus={this.props.onFocus}
				onBlur={this.props.onBlur}
				selected={this.state.value}
				showPopperArrow={false}
				placeholderText={this.props.placeholder}
				maxDate={new Date()}
				minDate={new Date("2020-06-02")}
				onChange={this.handleChange}
			/>
		);
	}

	private getThemeClass() {
		return this.props.dark ?
			"form-raw-input-dark" :
			"form-raw-input-light"
	}

	private handleChange(date : Date | null, event : ChangeEvent) {
		this.setState({
			value: date
		});
		if (!date) {
			this.props.onChange("", event);
		} else {
			this.props.onChange(
				`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`, 
				event
			);
		}
	};
}