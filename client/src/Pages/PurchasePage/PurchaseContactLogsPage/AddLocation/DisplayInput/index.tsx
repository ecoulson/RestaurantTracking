import React from "react";
import SlideSwitch from "../../../../../Components/SlideSwitch";
import NumberInput from "../../../../../Components/NumberInput";
import IconType from "../../../../../Components/Icon/IconTypes";
import IDisplayInputState from "./IDisplayInputState";
import IDisplayInputProps from "./IDisplayInputProps";
import "./index.css";

export default class    DisplayInput extends React.Component<IDisplayInputProps, IDisplayInputState> {
    constructor(props: IDisplayInputProps) {
        super(props);
        this.state = {
            type: 0,
            counts: props.displayTypes.map((value) => {
                return [value, 0]
            })
        }
        this.handleDisplayTypeChange = this.handleDisplayTypeChange.bind(this);
        this.getDisplayChangeHandler = this.getDisplayChangeHandler.bind(this);
    }

    render() {
        return (
            <>
                <SlideSwitch optionWidth={100} onChange={this.handleDisplayTypeChange}>
                    {this.renderSwitchOptions()}
                </SlideSwitch>
                {this.renderInput()}
                {this.renderSelectedDisplays()}
            </>
        )
    }

    renderSwitchOptions() {
        return this.props.displayTypes.map((displayType, i) => {
            return <span key={i} className="display-type-option">{displayType}</span>
        })
    }

    renderSelectedDisplays() {
        return <p>{this.getDisplayString()}</p>
    }

    getDisplayString() {
        return this.state.counts.reduce((displayString: string[], count) => {
            return [...displayString, `${!isNaN(count[1]) ? count[1] : 0}x ${this.capitalize(count[0])} Displays`]
        }, []).join(", ")
    }

    handleDisplayTypeChange(type: number) {
        this.setState({ type })
    }

    renderInput() {
        const displayName = this.props.displayTypes[this.state.type];
        const value = this.state.counts[this.state.type][1]
        return (
            <NumberInput 
                id={`${displayName}-${this.state.type}`}
                value={isNaN(value) ? "" : value.toString()}
                onChange={this.getDisplayChangeHandler()} 
                label={`${this.capitalize(displayName)} Displays`}
                placeHolder={`Enter ${displayName.toLowerCase()} displays for this location`}
                icon={IconType.Image} />
        )
    }

    getDisplayChangeHandler() {
        return (displayCount: number) => {
            const displayName = this.props.displayTypes[this.state.type];
            this.setState({
                counts: this.state.counts.map((count) => {
                    if (count[0] === displayName) {
                        return [displayName, displayCount]
                    } else {
                        return count;
                    }
                })
            }, () => {
                this.props.onChange(this.state.counts);
            })
        }
    }

    private capitalize(word: string) {
        return word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase();
    }
}