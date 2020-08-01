import React from "react";
import LocationSetup from "./LocationSetup";
import BillingCycleSetup from "./BillingCycleSetup";
import "./index.css";
import IContactLogSetupProps from "./IContactLogSetupProps";
import OrganizationSetup from "./OrganizationSetup";
import IContactLogSetupState from "./IContactLogSetupState";
import GetBillingPlanRequest from "../../../../API/GetBillingPlanRequest";
import IResponse from "../../../../API/IResponse";
import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";
import { AppType } from "../../../../Store/Cart/types";
import IProductPrice from "../../../../API/GetProductPricesRequest/IProductPrice";
import GetProductPricesRequest from "../../../../API/GetProductPricesRequest";

export default class ContactLogSetup extends React.Component<IContactLogSetupProps, IContactLogSetupState> {
    constructor(props : IContactLogSetupProps) {
        super(props);
        this.state = {
            billingPrices: [],
            productPrices: []
        }
        this.onBillingPlan = this.onBillingPlan.bind(this);
        this.onProductPrices = this.onProductPrices.bind(this);
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
                        <BillingCycleSetup 
                            plans={this.state.billingPrices} 
                            description="Chose a billing plan to maintain your contact logs software"
                            onBillingPlan={this.props.onBillingPlan}/>
                    </>
                )
            case 1:
                return (
                    <>
                        <GetProductPricesRequest 
                            send
                            type={AppType.ContactLogs} 
                            onComplete={this.onProductPrices} />
                        {
                            this.state.productPrices.length === 0 ? null : 
                            <LocationSetup productPrices={this.state.productPrices} />
                        }
                    </>
                )
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
            billingPrices: response.data
        })
    }

    onProductPrices(response : IResponse<IProductPrice[]>) {
        console.log(response.data);
        this.setState({
            productPrices: response.data
        })
    }
}