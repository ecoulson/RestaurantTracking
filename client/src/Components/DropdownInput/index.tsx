import React, { createRef, RefObject, TouchEvent, MouseEvent } from "react";
import "./index.css"
import IDropdownInputProps from "./IDropdownInputProps";
import IDropdownInputState from "./IDropdownInputState";
import Icon from "../Icon";
import IconType from "../Icon/IconTypes";

export default class DropdownInput extends React.Component<IDropdownInputProps, IDropdownInputState> {
    private selectRef : RefObject<HTMLSelectElement>;

    constructor(props: IDropdownInputProps) {
        super(props);
        this.state = {
            showing: false
        }
        this.selectRef = createRef();
        this.onClick = this.onClick.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    render() {
        return (
            <>
                <div className="dropdown-input">
                    <div className="dropdown-input-value-container">
                        <div onClick={this.onClick} className="dropdown-input-value">
                            <span className="dropdown-input-value-text">{this.state.value ? this.state.value : "Select one:"}</span> 
                            <Icon width={30} height={30} color="#CBCACA" icon={IconType.ChevronDown} /> 
                        </div>
                    </div>
                    <div className={`dropdown-input-menu ${this.getVisibleClass()}`}>
                        {this.renderElements()}
                    </div>
                </div>
                <select className="dropdown-input-native" ref={this.selectRef}>
                    {this.renderOptions()}
                </select>
            </>
        )
    }

    renderOptions() {
        return this.props.values.map((value) => {
            return <option value={value}>{value}</option>
        })
    }

    renderElements() {
        return this.props.values.map((value, i) => {
            return (
                <div id={`option-${0}`} onClick={this.selectValue} className="dropdown-input-option">
                    {value}
                </div>
            )
        })
    }

    selectValue(event : MouseEvent) {
        const id = (event.target as HTMLDivElement).id.replace("option-", "")
        this.setState({
            value: (event.target as HTMLDivElement).textContent as string,
            showing: false
        }, () => {
            this.props.onChange(this.state.value as string, parseInt(id));
        })
    }

    getVisibleClass() {
        return this.state.showing ?
            "dropdown-input-menu-show" :
            "dropdown-input-menu-hide"
    }

    onTouch(event : TouchEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.selectRef.current?.focus();
    }

    onClick(event : MouseEvent) {
        this.setState({
            showing: !this.state.showing
        })
    }
}