import React from "react";
import IFullNameInputState from "./IFullNameInputState";
import IFullNameInputProps from "./IFullNameInputProps";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import FormValue from "../FormInput/FormValue";

export default class FullNameInput extends React.Component<IFullNameInputProps, IFullNameInputState> {
    constructor(props : IFullNameInputProps) {
        super(props);
        this.state = {
            name: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <FormInput
                value={this.state.name}
                iconColor={this.props.iconColor}
                isValid={this.state.name !== ""}
                id={this.props.id}
                type="text"
                label="Full name"
                icon={IconType.Info}
                placeHolder="Enter your fullname"
                onChange={this.onChange}
            />
        )
    }

    private onChange(name : FormValue<string>) {
        const names = name.value.split(" ")
        this.props.onChange(new FormValue<string[]>(
            names,
            names.length !== 0
        ));
        this.setState({
            name: name.value
        })
    }
}