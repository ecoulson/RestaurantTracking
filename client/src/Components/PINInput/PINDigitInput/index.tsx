import React, { ChangeEvent, KeyboardEvent } from "react";
import "./index.css";
import IPINDigitState from "./IPINDigitState";
import IPINDigitProps from "./IPINDigitProps";

export default class PINDigitInput extends React.Component<IPINDigitProps, IPINDigitState> {
    private digitRegex : RegExp;

    constructor(props: any) {
        super(props);
        this.digitRegex = new RegExp("[0-9]")
        this.state = {
            digit: "",
            focused: false
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    render() {
        return <input 
                    className={`pin-digit-input ${this.getCompleteClass()}`}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    ref={this.props.inputRef}
                    onKeyDown={this.onKeyPress}
                    onChange={this.onChange}
                    value={this.state.digit}
                    type="tel" />;
    }

    onFocus() {
        this.setState({
            focused: true
        })
    }

    onBlur() {
        this.setState({
            focused: false
        })
    }

    getCompleteClass() {
        return (this.props.complete || this.state.focused) ?
            "pin-digit-input-complete" :
            ""
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.keyCode === 8) {
            event.preventDefault();
            this.setState({
                digit: ""
            }, () => {
                this.props.onChange(this.state.digit, true)
            })
        }
    }

    onChange(event : ChangeEvent) {
        const element = event.target as HTMLInputElement;
        if (this.isDigit(element) || element.value.length === 0) {
            this.setState({
                digit: element.value
            }, () => {
                this.props.onChange(this.state.digit, this.state.digit === "")
            })
        }
    }

    private isDigit(element : HTMLInputElement) {
        return element.value.match(this.digitRegex) && element.value.length === 1
    }
}