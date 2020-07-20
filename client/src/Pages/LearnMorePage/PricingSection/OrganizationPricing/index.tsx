import React from "react";
import IPricingModel from "../Model/IPricingModel";
import RestaurantPricingParameters from "./IOrganizationPricingParameters";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import IOrganizationPricingState from "./IOrganizationPricingState";
import OrganizationPricingStrategy from "./OrganizationPricingStrategy";
import NumberInput from "../../../../Components/NumberInput";
import IconType from "../../../../Components/Icon/IconTypes";

export default class OrganizationPricing extends React.Component<IPricingModel, IOrganizationPricingState> {
    constructor(pricingModel : IPricingModel) {
        super(pricingModel);
        this.state = {
            users: 0,
            months: 0
        }
        this.handleMonthInput = this.handleMonthInput.bind(this);
        this.handleUsersInput = this.handleUsersInput.bind(this);
    }

    render() {
        return (
            <>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the cost per month</LearnMoreSubtitle>
                <NumberInput 
                    onChange={this.handleUsersInput} 
                    label="Estimated Users"
                    placeHolder="Enter estimated users"
                    icon={IconType.Users} />
                <LearnMoreSectionParagraph>{this.getPriceString()}</LearnMoreSectionParagraph>
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

    private handleUsersInput(users: number) {
        this.setState({ users })
    }

    private handleMonthInput(months: number) {
        this.setState({ months })
    }


    private getPriceString() {
        if (isNaN(this.state.users)) {
            return "$10 / Month"
        }
        const parameters = new RestaurantPricingParameters(this.state.users);
        const strategy = (this.props.pricingStrategy as OrganizationPricingStrategy);
        return `$${strategy.calculatePrice(parameters).monthly} / Month`
    }

    private getFuturePrice() {
        if (isNaN(this.state.users) || isNaN(this.state.months)) {
            return "$0 / After 0 Months"
        }
        const parameters = new RestaurantPricingParameters(this.state.users);
        const strategy = (this.props.pricingStrategy as OrganizationPricingStrategy);
        return `$${strategy.calculatePrice(parameters).monthly * this.state.months} / After ${this.state.months} Months`
    }
}