import React from "react";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import IPricingModel from "../Model/IPricingModel";
import IContactLogPricingState from "./IContactLogPricingState";
import ContactLogPricingStrategy from "./ContactLogPricingStrategy";
import NumberInput from "../../../../Components/NumberInput";
import IconType from "../../../../Components/Icon/IconTypes";
import ContactLogPricingParameters from "./ContactLogPricingParameters";
import DisplayPricingSection from "./DisplayPricingSection";

export default class ContactLogPricing extends React.Component<IPricingModel, IContactLogPricingState> {
    constructor(props : IPricingModel) {
        super(props);
        this.state = {
            years: 1,
            standingDisplays: 0,
            tableTopDisplays: 0,
            wallDisplays: 0
        }
        this.handleYearsInput = this.handleYearsInput.bind(this);
        this.handleTabletopDisplays = this.handleTabletopDisplays.bind(this);
        this.handleStandingDisplays = this.handleStandingDisplays.bind(this);
        this.handleWallDisplays = this.handleWallDisplays.bind(this);
    }

    render() {
        return (
            <>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the setup cost</LearnMoreSubtitle>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <DisplayPricingSection
                        onChange={this.handleTabletopDisplays}
                        label="Tabletop Displays"
                        placeHolder="Enter number of tabletop display(s)"
                        image="/table-display.png"/>
                    <DisplayPricingSection 
                        onChange={this.handleWallDisplays} 
                        label="Wall Displays"
                        placeHolder="Enter number of wall display(s)"
                        image="/wall-display.png" />
                    <DisplayPricingSection 
                        onChange={this.handleStandingDisplays} 
                        label="Standing Displays"
                        placeHolder="Enter number of standing display(s)"
                        image="/standing-display.png" />
                </div>
                <LearnMoreSectionParagraph>{this.getSetupPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Maintain and secure your contact log for the yearly price of </LearnMoreSubtitle>
                <LearnMoreSectionParagraph>{this.getYearlyPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>See the cost over time</LearnMoreSubtitle>
                <NumberInput 
                    onChange={this.handleYearsInput} 
                    label="Years"
                    placeHolder="Enter years"
                    icon={IconType.Calendar} />
                <LearnMoreSectionParagraph>{this.getFuturePrice()}</LearnMoreSectionParagraph>
            </>
        )
    }

    private handleYearsInput(years: number) {
        this.setState({ years: this.getValue(years) })
    }

    private handleTabletopDisplays(tableTopDisplays: number) {
        this.setState({ tableTopDisplays: this.getValue(tableTopDisplays) })
    }

    private handleStandingDisplays(standingDisplays: number) {
        this.setState({ standingDisplays: this.getValue(standingDisplays) })
    }

    private handleWallDisplays(wallDisplays: number) {
        this.setState({ wallDisplays: this.getValue(wallDisplays) })
    }

    getValue(n : number) {
        return isNaN(n) ? 0 : n;
    }

    private getSetupPriceString() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays
        )
        return `$${strategy.calculatePrice(parameters).setup.toFixed(2)}`
    }

    private getYearlyPriceString() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays
        )
        const price = strategy.calculatePrice(parameters);
        return `$${(price.setup + price.monthly).toFixed(2)} / Year`
    }

    private getFuturePrice() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays
        )
        const price = strategy.calculatePrice(parameters);
        return `$${(price.setup + price.monthly * this.state.years).toFixed(2)} / After ${this.state.years} Years`
    }
}