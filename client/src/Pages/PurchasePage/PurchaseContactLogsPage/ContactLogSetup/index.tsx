import React from "react";
import LocationSetup from "./LocationSetup";
import BillingCycleSetup from "./BillingCycleSetup";
import "./index.css";
import IContactLogSetupProps from "./IContactLogSetupProps";
import OrganizationSetup from "./OrganizationSetup";
import IContactLogSetupState from "./IContactLogSetupState";
import GetBillingPlanRequest from "../../../../API/GetBillingPlanRequest";
import AppType from "../../../../lib/AppType";
import IResponse from "../../../../API/IResponse";
import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";

export default class ContactLogSetup extends React.Component<IContactLogSetupProps, IContactLogSetupState> {
    constructor(props : IContactLogSetupProps) {
        super(props);
        this.state = {
            prices: []
        }
        this.onBillingPlan = this.onBillingPlan.bind(this);
    }

    render() {
        return (
            <div className="contact-log-setup-container">
                {this.getPage()}
            </div>
        )
    }

    getPage() {
        switch(this.props.page) {
            case 0:
                return (
                    <> 
                        <GetBillingPlanRequest
                            send
                            appType={AppType.ContactLogs}
                            onComplete={this.onBillingPlan}
                            />
                        <BillingCycleSetup plans={this.state.prices} 
                            description="Chose a billing plan to maintain your contact logs software"
                            onBillingPlan={this.props.onBillingPlan}
                            />
                    </>
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

    onBillingPlan(response : IResponse<IPrice[]>) {
        this.setState({
            prices: response.data
        })
    }
}