import React from "react";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import IPricingModel from "../Model/IPricingModel";
import IContactLogPricingState from "./IContactLogPricingState";
import ContactLogPricingStrategy from "./ContactLogPricingStrategy";
import ContactLogPricingParameters from "./ContactLogPricingParameters";
import DisplayPricingSection from "./DisplayPricingSection";
import BillingCycleSetup from "../../../PurchasePage/PurchaseContactLogsPage/ContactLogSetup/BillingCycleSetup";
import { AppType } from "../../../../Store/Cart/types";
import GetBillingPlanRequest from "../../../../API/GetBillingPlanRequest";
import IResponse from "../../../../API/IResponse";
import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";

export default class ContactLogPricing extends React.Component<IPricingModel, IContactLogPricingState> {
    constructor(props : IPricingModel) {
        super(props);
        this.state = {
            standingDisplays: 0,
            tableTopDisplays: 0,
            wallDisplays: 0,
            billingPlans: [],
            currentPlan: null
        }
        this.handleTabletopDisplays = this.handleTabletopDisplays.bind(this);
        this.handleStandingDisplays = this.handleStandingDisplays.bind(this);
        this.handleWallDisplays = this.handleWallDisplays.bind(this);
        this.onBillingPlans = this.onBillingPlans.bind(this);
        this.onBillingPlan = this.onBillingPlan.bind(this);
    }

    render() {
        return (
            <>
                <GetBillingPlanRequest
                    send
                    appType={AppType.ContactLogs}
                    onComplete={this.onBillingPlans} />
                <LearnMoreSubtitle>Select a monthly payment plan</LearnMoreSubtitle>
                <BillingCycleSetup 
                    plans={this.state.billingPlans} 
                    description="Select a plan that works for you" 
                    onBillingPlan={this.onBillingPlan} />
                <LearnMoreSubtitle>Setup your check in system for the yearly price of </LearnMoreSubtitle>
                <div style={{display: "flex", flexWrap: "wrap", marginTop: "25px"}}>
                    <DisplayPricingSection
                        id="number-1"
                        onChange={this.handleTabletopDisplays}
                        alt="example tabletop display"
                        label="Tabletop Displays"
                        placeHolder="Enter number of tabletop display(s)"
                        image="/table-display.png"/>
                    <DisplayPricingSection 
                        id="number-2"
                        alt="example wall display"
                        onChange={this.handleWallDisplays} 
                        label="Wall Displays"
                        placeHolder="Enter number of wall display(s)"
                        image="/wall-display.png" />
                    <DisplayPricingSection 
                        id="number-3"
                        alt="example standing display"
                        onChange={this.handleStandingDisplays} 
                        label="Standing Displays"
                        placeHolder="Enter number of standing display(s)"
                        image="/standing-display.png" />
                </div>
                <LearnMoreSectionParagraph>{this.getYearlyPriceString()}</LearnMoreSectionParagraph>
            </>
        )
    }

    onBillingPlans(response : IResponse<IPrice[]>) {
        this.setState({
            billingPlans: response.data
        })
    }

    onBillingPlan(currentPlan : IPrice | null) {
        this.setState({ currentPlan })
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
            this.state.wallDisplays,
            this.state.currentPlan?.unit_amount ? this.state.currentPlan.unit_amount : 0
        )
        return `$${strategy.calculatePrice(parameters).setup.toFixed(2)}`
    }

    private getYearlyPriceString() {
        const strategy = this.props.pricingStrategy as ContactLogPricingStrategy;
        const parameters = new ContactLogPricingParameters(
            this.state.standingDisplays,
            this.state.tableTopDisplays,
            this.state.wallDisplays,
            this.state.currentPlan?.unit_amount ? this.state.currentPlan.unit_amount : 0
        )
        const price = strategy.calculatePrice(parameters);
        return `$${(price.setup + price.monthly).toFixed(2)} / Year`
    }
}