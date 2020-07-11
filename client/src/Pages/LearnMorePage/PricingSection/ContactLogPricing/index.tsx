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
            months: 0,
            standingDisplays: 0,
            tableTopDisplays: 0,
            wallDisplays: 0
        }
        this.handleMonthInput = this.handleMonthInput.bind(this);
        this.handleTabletopDisplays = this.handleTabletopDisplays.bind(this);
        this.handleStandingDisplays = this.handleStandingDisplays.bind(this);
        this.handleWallDisplays = this.handleWallDisplays.bind(this);
    }

    render() {
        return (
            <>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the setup cost</LearnMoreSubtitle>
                <div style={{display: "flex"}}>
                    <DisplayPricingSection
                        onChange={this.handleTabletopDisplays}
                        label="Tabletop Displays"
                        placeHolder="Enter number of tabletop display(s)"
                        image="https://alpineindustries.com/wp-content/uploads/2020/02/acrylic-sign-holder-639-8511-tl.jpg"/>
                    <DisplayPricingSection 
                        onChange={this.handleWallDisplays} 
                        label="Wall Displays"
                        placeHolder="Enter number of wall display(s)"
                        image="https://www.fixturedisplays.com/image/data/10772-3%208511%20acrylic/10772-3%208511%20acrylic.JPG" />
                    <DisplayPricingSection 
                        onChange={this.handleStandingDisplays} 
                        label="Standing Displays"
                        placeHolder="Enter number of standing display(s)"
                        image="https://m.media-amazon.com/images/I/61-tPg0dvNL._SR500,500_.jpg" />
                </div>
                <LearnMoreSectionParagraph>{this.getSetupPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Maintain and secure your contact log for the monthly price of </LearnMoreSubtitle>
                <LearnMoreSectionParagraph>{this.getMonthlyPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>See the cost over time</LearnMoreSubtitle>
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
        this.setState({ months: this.getValue(months) })
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

    private getMonthlyPriceString() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays
        )
        return `$${strategy.calculatePrice(parameters).monthly} / Month`
    }

    private getFuturePrice() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays
        )
        const price = strategy.calculatePrice(parameters);
        return `$${(price.setup + price.monthly * this.state.months).toFixed(2)} / After ${this.state.months} Months`
    }
}