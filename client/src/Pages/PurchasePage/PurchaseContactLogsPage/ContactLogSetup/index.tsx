import React from "react";
import LocationSetup from "./LocationSetup";
import BillingCycleSetup from "./BillingCycleSetup";
import "./index.css";
import BillingCycleType from "./BillingCycleSetup/BillingCycleType";
import ContactLogPricingStrategy from "../../../LearnMorePage/PricingSection/ContactLogPricing/ContactLogPricingStrategy";
import IContactLogSetupProps from "./IContactLogSetupProps";

export default class ContactLogSetup extends React.Component<IContactLogSetupProps> {
    render() {
        return (
            <div className="contact-log-setup-container">
                {this.getPage()}
            </div>
        )
    }

    getPage() {
        const pricingStrategy = new ContactLogPricingStrategy();
        const breakdown = pricingStrategy.getPriceBreakdown()
        return this.props.page === 0 ?
            (
                <BillingCycleSetup plans={[
                    {
                        type: BillingCycleType.Monthly,
                        name: "Monthly",
                        cost: Math.ceil(breakdown.get("software") as number / 12),
                        unit: "month"
                    },
                    {
                        type: BillingCycleType.Biannually,
                        name: "Biannually",
                        cost: Math.ceil(breakdown.get("software") as number / 2),
                        unit: "6 months"
                    },
                    {
                        type: BillingCycleType.Yearly,
                        name: "Yearly",
                        cost: breakdown.get("software") as number,
                        unit: "year"
                    }
                ]} 
                description="Chose a billing plan to maintain your contact logs software" />
            ) :
            (<LocationSetup />)
    }
}