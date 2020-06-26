import React, { MouseEvent } from "react";
import "./index.css";
import ISlideSwitchState from "./ISlideSwitchState";
import ISlideSwitchProps from "./ISlideSwitchProps";

export default class SlideSwitch extends React.Component<ISlideSwitchProps, ISlideSwitchState> {
    constructor(props: ISlideSwitchProps) {
        super(props)
        this.state = {
            selected: this.props.selected ? this.props.selected : 1
        }
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }
    
    componentWillReceiveProps(props : ISlideSwitchProps) {
        if (props.selected) {
            this.setState({
                selected: props.selected
            })
        }
    }

    render() {
        console.log(this.state.selected)
        return (
            <div style={this.getWidth()} className="slide-switch-container">
                <div style={this.getSliderPosition()} className="slide-switch-background"></div>
                <div className="slide-switch-option-container">
                    {this.getOptions()}
                </div>
            </div>
        )
    }

    private getOptionWidth() {
        return this.props.optionWidth ?
            { width: this.props.optionWidth + "px" } :
            { width: "90px" }
    }

    private getWidth() {
        return this.props.optionWidth ? 
            {  width: React.Children.toArray(this.props.children).length * this.props.optionWidth + "px" } :
            { width: React.Children.toArray(this.props.children).length * 90 + "px" }
    }

    private getOptions() {
        return React.Children.toArray(this.props.children).map((child, i) => {
            return (
                <div 
                    onClick={this.handleOptionClick} 
                    style={this.getOptionWidth()}
                    id={`option-${i + 1}`} 
                    key={i} 
                    className="slide-switch-option">
                    {child}
                </div>
            );
        })
    }

    private handleOptionClick(event: MouseEvent) {
        const optionElement = this.getOption(event.target as HTMLElement);
        const id = parseInt(optionElement.id.split("-")[1]);
        this.props.onChange(id - 1);
        this.setState({
            selected: id
        });
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

    private getSliderPosition() {
        const position = this.props.optionWidth ?
            (this.state.selected - 1) * this.props.optionWidth :
            (this.state.selected - 1) * 90
        return {
            ...this.getOptionWidth(),
            transform: `translateX(${position}px)`
        }
    }
}