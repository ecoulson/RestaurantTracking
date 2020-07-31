import React from "react";
import LocationSetup from "./LocationSetup";
import BillingCycleSetup from "./BillingCycleSetup";
import "./index.css";
import BillingCycleType from "./BillingCycleSetup/BillingCycleType";
import ContactLogPricingStrategy from "../../../LearnMorePage/PricingSection/ContactLogPricing/ContactLogPricingStrategy";
import IContactLogSetupProps from "./IContactLogSetupProps";
import OrganizationSetup from "./OrganizationSetup";

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
        switch(this.props.page) {
            case 0:
                return (
                    <BillingCycleSetup plans={[
                        {
                            type: BillingCycleType.Monthly,
                            name: "Tier 1",
                            cost: Math.ceil(breakdown.get("software") as number / 12),
                            unit: "month",
                            priceId: "price_1HAoY9DHaKfj17c3o9S4G82Q"
                        },
                        {
                            type: BillingCycleType.Monthly,
                            name: "Tier 2",
                            cost: Math.ceil(breakdown.get("software") as number / 2),
                            unit: "6 months",
                            priceId: "price_1HAobzDHaKfj17c3Q6Ik4yrG"
                        },
                        {
                            type: BillingCycleType.Monthly,
                            name: "Tier 3",
                            cost: breakdown.get("software") as number,
                            unit: "year",
                            priceId: "price_1HAobzDHaKfj17c3Q6Ik4yrG"
                        },
                        {
                            type: BillingCycleType.Monthly,
                            name: "Tier 4",
                            cost: breakdown.get("software") as number,
                            unit: "year",
                            priceId: "price_1HAog1DHaKfj17c3y3rsuHNT"
                        }
                    ]} 
                    description="Chose a billing plan to maintain your contact logs software" />
                )
            case 1:
                return <LocationSetup />
            case 2:
                return <OrganizationSetup 
                            onPaymentIntent={this.props.onPaymentIntent}
                            onBillingEmail={this.props.onBillingEmail}
                            onAddress={this.props.onAddress}
                            onOrganizationId={this.props.onOrganizationId}
                            onOrganizationName={this.props.onOrganizationName}
                            cart={this.props.cart} />
        }
    }
}