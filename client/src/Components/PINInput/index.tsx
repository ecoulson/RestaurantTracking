import React from "react";
import PINDigitInput from "./PINDigitInput";
import "./index.css";
import IPINInputProps from "./IPINInputProps";
import IPINInputState from "./IPINInputState";
import FormValue from "../FormInput/FormValue";

export default class PINInput extends React.Component<IPINInputProps, IPINInputState> {
    constructor(props : IPINInputProps) {
        super(props);
        this.state = {
            digits: ["", "", "", ""],
            refs: [
                React.createRef<HTMLInputElement>(),
                React.createRef<HTMLInputElement>(),
                React.createRef<HTMLInputElement>(),
                React.createRef<HTMLInputElement>()
            ]
        }
    }

    render() {
        return (
            <div className="pin-input">
                {this.state.digits.map((digit, i) => {
                    return <PINDigitInput 
                                key={i} 
                                complete={this.isComplete()} 
                                inputRef={this.state.refs[i]} 
                                onChange={this.handlePINChange(i)} />
                })}
            </div>
        )
    }

    isComplete() {
        return this.state.digits.reduce((complete, digit) => {
            return digit.length === 1 && complete;
        }, true);
    }

    handlePINChange(digitIndex : number) {
        return (updatedDigit : string, removed : boolean) => {
            this.setState({
                digits: this.state.digits.map((digit, i) => {
                    if (i === digitIndex) {
                        return updatedDigit
                    } else {
                        return digit;
                    }
                })
            }, () => {
                if (!removed) {
                    this.focus(digitIndex + 1);
                } else {
                    this.focus(digitIndex - 1);
                }
                const PIN = this.state.digits.join("");
                this.props.onChange(new FormValue<string>(PIN, PIN.length === 4));
            })
        }
    }

    focus(index: number) {
        if (index < this.state.refs.length && index >= 0) {
            this.state.refs[index].current?.focus()
        }
    }
}