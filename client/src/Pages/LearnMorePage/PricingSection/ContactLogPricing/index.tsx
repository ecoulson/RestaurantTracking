import React from "react";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import IPricingModel from "../Model/IPricingModel";
import IContactLogPricingState from "./IContactLogPricingState";
import ContactLogPricingStrategy from "./ContactLogPricingStrategy";
import NumberInput from "../../../../Components/NumberInput";
import IconType from "../../../../Components/Icon/IconTypes";
import ContactLogPricingParameters from "./ContactLogPricingParameters";

export default class ContactLogPricing extends React.Component<IPricingModel, IContactLogPricingState> {
    constructor(props : IPricingModel) {
        super(props);
        this.state = {
            months: 0,
            smallDisplays: 0,
            largeDisplays: 0,
            wallDisplays: 0
        }
        this.handleMonthInput = this.handleMonthInput.bind(this);
        this.handleLargeDisplays = this.handleLargeDisplays.bind(this);
        this.handleSmallDisplays = this.handleSmallDisplays.bind(this);
        this.handleWallDisplays = this.handleWallDisplays.bind(this);
    }

    render() {
        return (
            <>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the setup cost</LearnMoreSubtitle>
                <NumberInput 
                    onChange={this.handleSmallDisplays} 
                    label="Small Displays"
                    placeHolder="Enter number of small displays"
                    icon={IconType.Image} />
                <NumberInput 
                    onChange={this.handleLargeDisplays} 
                    label="Large Displays"
                    placeHolder="Enter number of large displays"
                    icon={IconType.Image} />
                <NumberInput 
                    onChange={this.handleWallDisplays} 
                    label="Wall Displays"
                    placeHolder="Enter number of wall displays"
                    icon={IconType.Image} />
                <LearnMoreSectionParagraph>{this.getSetupPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Maintain and secure your contact log for the monthly price of </LearnMoreSubtitle>
                <LearnMoreSectionParagraph>{this.getMonthlyPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the cost over time</LearnMoreSubtitle>
                <NumberInput 
                    onChange={this.handleMonthInput} 
                    label="Months"
                    placeHolder="Enter months"
                    icon={IconType.Calendar} />
                <LearnMoreSectionParagraph>{this.getFuturePrice()}</LearnMoreSectionParagraph>
            </>
        )
    }

    private handleMonthInput(months: number) {
        this.setState({ months })
    }

    private handleLargeDisplays(largeDisplays: number) {
        this.setState({ largeDisplays })
    }

    private handleSmallDisplays(smallDisplays: number) {
        this.setState({ smallDisplays })
    }

    private handleWallDisplays(wallDisplays: number) {
        this.setState({ wallDisplays })
    }

    private getSetupPriceString() {
        const strategy = (this.props.pricingStrategy as ContactLogPricingStrategy);
        if (isNaN(this.state.smallDisplays) ||
            isNaN(this.state.largeDisplays) ||
            isNaN(this.state.wallDisplays)) {
                return "0$"
        }
        const parameters = new ContactLogPricingParameters(
            this.state.smallDisplays,
            this.state.largeDisplays,
            this.state.wallDisplays
        )
        return `$${strategy.calculatePrice(parameters).setup.toFixed(2)}`
    }

    private getMonthlyPriceString() {
        const strategy = (this.props.pricingStrategy as ContactLogPricingStrategy);
        const parameters = new ContactLogPricingParameters(
            this.state.smallDisplays,
            this.state.largeDisplays,
            this.state.wallDisplays
        )
        return `$${strategy.calculatePrice(parameters).monthly} / Month`
    }

    private getFuturePrice() {
        const strategy = (this.props.pricingStrategy as ContactLogPricingStrategy);
        const parameters = new ContactLogPricingParameters(
            this.state.smallDisplays,
            this.state.largeDisplays,
            this.state.wallDisplays
        )
        const price = strategy.calculatePrice(parameters);
        if (isNaN(this.state.smallDisplays) ||
            isNaN(this.state.largeDisplays) ||
            isNaN(this.state.wallDisplays) ||
            isNaN(this.state.months)) {
                return `$${price.monthly}`
        }
        return `$${(price.setup + price.monthly * this.state.months).toFixed(2)} / After ${this.state.months} Months`
    }
}