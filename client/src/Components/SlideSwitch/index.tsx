import React, { MouseEvent } from "react";
import "./index.css";
import Icon from "../Icon";
import IconType from "../Icon/IconTypes";
import ISlideSwitchState from "./ISlideSwitchState";
import ISlideSwitchProps from "./ISlideSwitchProps";

export default class SlideSwitch extends React.Component<ISlideSwitchProps, ISlideSwitchState> {
    constructor(props: ISlideSwitchProps) {
        super(props)
        this.state = {
            selected: 1
        }
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    render() {
        return (
            <div className="slide-switch-container">
                <div className={`slide-switch-background ${this.getPositionClass()}`}></div>
                <div className="slide-switch-option-container">
                    <div onClick={this.handleOptionClick} id="option-1" className="slide-switch-option">
                        <Icon color="white" icon={IconType.Phone}/>
                    </div>
                    <div onClick={this.handleOptionClick} id="option-2" className="slide-switch-option">
                        <Icon color="white" icon={IconType.Mail}/>
                    </div>
                </div>
            </div>
        )
    }

    private handleOptionClick(event: MouseEvent) {
        const optionElement = this.getOption(event.target as HTMLElement);
        const id = parseInt(optionElement.id.split("-")[1]);
        this.props.onChange(id);
        this.setState({
            selected: id
        })
    }

    private getOption(element : HTMLElement | null) : HTMLElement {
        if (!element) {
            throw new Error();
        }
        if (element.classList.contains("slide-switch-option")) {
            return element;
        } else {
            return this.getOption(element.parentElement);
        }
    }

    private getPositionClass() {
        if (this.state.selected === 1) {
            return "first"
        } else {
            return "last"
        }
    }
}