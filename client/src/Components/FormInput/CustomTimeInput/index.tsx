import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IInputProps from "../Input/IInputProps";
import ICustomTimeInputState from "./ICustomTimeInputState";
 
export default class CustomTimeInput extends React.Component<IInputProps, ICustomTimeInputState> {
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
				dateFormat="h:mm aa"
				timeIntervals={15}
                showTimeSelectOnly
                showTimeSelect
				showPopperArrow={false}
				placeholderText={this.props.placeholder}
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
			const hour = date.getUTCHours();
			const minutes = date.getUTCMinutes();
			this.props.onChange(
				`${hour % 12}:` +
				`${minutes < 10 ? "0" + minutes : minutes} ` +
				`${hour > 12 ? "PM" : "AM"}`,
				event
			);
		}
	};
}