import React from "react";
import SlideSwitch from "../../../../../../Components/SlideSwitch";
import NumberInput from "../../../../../../Components/NumberInput";
import IconType from "../../../../../../Components/Icon/IconTypes";
import IDisplayInputState from "./IDisplayInputState";
import IDisplayInputProps from "./IDisplayInputProps";
import "./index.css";
import ContactLogPricingStrategy from "../../../../../LearnMorePage/PricingSection/ContactLogPricing/ContactLogPricingStrategy";

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
                <div className="display-input-slide-switch-container">
                    <SlideSwitch optionWidth={100} onChange={this.handleDisplayTypeChange}>
                        {this.renderSwitchOptions()}
                    </SlideSwitch>
                </div>
                {this.renderImage()}
                {this.renderInput()}
            </>
        )
    }

    renderSwitchOptions() {
        return this.props.displayTypes.map((displayType, i) => {
            return <span key={i} className="display-type-option">{displayType}</span>
        })
    }

    handleDisplayTypeChange(type: number) {
        this.setState({ type })
    }

    renderImage() {
        const displayName = this.props.displayTypes[this.state.type];
        return (
            <img className="display-image" src={`/${displayName.toLowerCase()}-display.png`}/>
        )
    }

    renderInput() {
        const displayName = this.props.displayTypes[this.state.type];
        const value = this.state.counts[this.state.type][1];
        const pricing = new ContactLogPricingStrategy();
        const breakdown = pricing.getPriceBreakdown();
        return (
            <NumberInput 
                id={`${displayName}-${this.state.type}`}
                value={isNaN(value) ? "" : value.toString()}
                onChange={this.getDisplayChangeHandler()} 
                hoverColor="black"
                label={`${this.capitalize(displayName)} Displays ($${breakdown.get(displayName)?.toFixed(2)})`}
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