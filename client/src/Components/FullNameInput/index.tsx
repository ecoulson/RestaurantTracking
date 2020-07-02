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
            name: props.value ? props.value.join(" ") : ""
        }
        this.onChange = this.onChange.bind(this);
    }

    static getDerivedStateFromProps(props : IFullNameInputProps, state : IFullNameInputState) : IFullNameInputState {
        return {
            name: props.value ? props.value.join(" ") : state.name,
        }
    }

    render() {
        return (
            <FormInput
                value={this.state.name}
                iconColor={this.props.iconColor}
                isValid={this.state.name !== "" && this.state.name.trim() !== ""}
                id={this.props.id}
                type="text"
                hoverColor={this.props.hoverColor}
                label="Full name"
                icon={IconType.Info}
                placeHolder="Enter your full name"
                onChange={this.onChange}
            />
        )
    }

    private onChange(name : FormValue<string>) {
        const names = name.value.split(" ")
        this.setState({
            name: name.value
        }, () => {
            this.props.onChange(new FormValue<string[]>(
                names,
                names.length !== 0 && name.value.trim() !== ""
            ));
        })
    }
}