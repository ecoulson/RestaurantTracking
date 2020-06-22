import React from "react";
import IPricingModel from "../Model/IPricingModel";
import RestaurantPricingParameters from "./IRestaurantPricingParameters";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import FormInput from "../../../../Components/FormInput";
import IconType from "../../../../Components/Icon/IconTypes";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import PurchaseButton from "../../PurchaseButton";
import IRestaurantPricingState from "./IRestaurantPricingState";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import "./index.css"

export default class RestaurantPricing extends React.Component<IPricingModel, IRestaurantPricingState> {
    constructor(pricingModel : IPricingModel) {
        super(pricingModel);
        this.state = {
            users: "1",
            months: "1"
        }
        this.handleMonthInput = this.handleMonthInput.bind(this);
        this.handleUsersInput = this.handleUsersInput.bind(this);
    }

    render() {
        return (
            <>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the cost per month</LearnMoreSubtitle>
                {this.getUserInput()}
                <LearnMoreSectionParagraph>{this.getPriceString()}</LearnMoreSectionParagraph>
                <LearnMoreSubtitle>Explore the cost over time</LearnMoreSubtitle>
                {this.getMonthInput()}
                <LearnMoreSectionParagraph>{this.getFuturePrice()}</LearnMoreSectionParagraph>
                <PurchaseButton />
            </>
        )
    }

    private getMonthInput() {
        return <FormInput 
                    iconColor="#AAAAAA" 
                    icon={IconType.Calendar} 
                    placeHolder="Enter number of months" 
                    value={this.state.months.toString()} 
                    label="Months" 
                    type="text" 
                    onChange={this.handleMonthInput} />
    }

    private handleMonthInput(month: IFormValue<string>) {
        this.setState({
            months: month.value
        })
    }

    private getUserInput() {
        return <FormInput 
                    iconColor="#AAAAAA" 
                    icon={IconType.User} 
                    placeHolder="Enter estimated number of users" 
                    value={this.state.users.toString()} 
                    label="Estimated Users" 
                    type="text" 
                    onChange={this.handleUsersInput} />
    }

    private handleUsersInput(users: IFormValue<string>) {
        this.setState({
            users: users.value
        })
    }

    private getPriceString() {
        let users = parseInt(this.state.users);
        if (isNaN(users)) {
            users = 0;
        }
        const parameters = new RestaurantPricingParameters(users);
        return `$${this.props.pricingStrategy.calculatePrice(parameters)} / Month`
    }

    private getFuturePrice() {
        let users = parseInt(this.state.users);
        if (isNaN(users)) {
            users = 0;
        }
        let months = parseInt(this.state.months);
        if (isNaN(months)) {
            months = 0;
        }
        const parameters = new RestaurantPricingParameters(users);
        return `$${this.props.pricingStrategy.calculatePrice(parameters) * months} / After ${months} Months`
    }
}