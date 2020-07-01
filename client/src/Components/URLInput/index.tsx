import React from "react";
import FormValue from "../FormInput/FormValue";
import IURLInputProps from "./IURLInputProps";
import IURLInputState from "./IURLInputState";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";
import ValidUrl from "valid-url"

export default class URLInput extends React.Component<IURLInputProps, IURLInputState> {
    constructor(props : IURLInputProps) {
        super(props);
        this.state = {
            url: new FormValue(
                props.value ? props.value : "", 
                props.value ? ValidUrl.isWebUri(props.value) !== undefined : false
            )
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <FormInput
                value={this.state.url.value}
                dark={this.props.dark}
                onChange={this.handleChange}
                icon={IconType.Link}
                hoverColor={this.props.hoverColor}
                iconColor={this.props.iconColor}
                isValid={this.state.url.valid}
                placeHolder="Enter URL"
                type="url"
                label="URL"
                />
        )
    }

    handleChange(url : IFormValue<string>) {  
        this.setState({ 
            url: new FormValue(url.value, ValidUrl.isWebUri(url.value) !== undefined)
        }, () => {
            this.props.onChange(this.state.url);
        })
    }
}