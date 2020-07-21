import React from "react";
import FormInput from "../FormInput";
import Menu from "./Menu";
import IDropdownState from "./IDropdownState";
import IDropdownProps from "./IDropdownProps";
import IFormValue from "../FormInput/IFormValue";

export default class DropdownInput extends React.Component<IDropdownProps, IDropdownState> {
    constructor(props: IDropdownProps) {
        super(props);
        this.state = {
            value: "",
            valid: false,
            focused: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.documentClickListener = this.documentClickListener.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClickListener)
    }

    documentClickListener(event : any) {
        this.setState({
            focused: this.containedInDropdown(event.target)
        })
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickListener)
    }

    private containedInDropdown(element : HTMLElement | null) : boolean {
        if (!element) {
            return false;
        }else if (element.classList.contains("dropdown")) {
            return true;
        } else {
            return this.containedInDropdown(element.parentElement);
        }
    }

    render() {
        return (
            <div className="dropdown">
                <FormInput
                    isValid={this.state.valid}
                    value={this.state.value}
                    onChange={this.onChange}
                    dark={this.props.dark}
                    id={this.props.id}
                    iconColor={this.props.iconColor}
                    type="text"
                    name="dropdown"
                    label={this.props.label}
                    hoverColor={this.props.hoverColor}
                    icon={this.props.icon}
                    placeHolder={this.props.placeholder} />
                <Menu 
                    handleMenuClick={this.handleMenuItemClick}
                    visible={this.isVisible()} 
                    values={this.props.values} />
            </div>
        )
    }

    private isDisabled() {
        return this.props.values.length === 0;
    }

    private isVisible() {
        return this.state.focused && !this.state.valid && !this.isDisabled();
    }

    private onChange(dropdownValue : IFormValue<string>) {
        this.setState({
            value: dropdownValue.value,
            valid: this.validateInput(dropdownValue.value.toLowerCase())
        }, () => {
            this.props.onChange({
                value: 0,
                valid: this.props.values.length === 1
            }, dropdownValue.value);
        })
    }

    private validateInput(key : string) {
        let start = 0;
        let end = this.props.values.length - 1;
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this.props.values[mid].toLowerCase() === key) {
                return true;
            } else if (this.props.values[mid].toLowerCase() < key) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return false;
    }

    private handleMenuItemClick(index : number) {
        this.props.onChange({
            value: index,
            valid: true
        })
        this.setState({
            value: this.props.values[index],
            valid: true
        })
    }
}