import React from "react";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import Button from "../../../Components/Button";
import ICancelSubscriptionSectionProps from "./ICancelSubscriptionSectionProps";
import ICancelSubscriptionSectionState from "./ICancelSubscriptionSectionState";
import GetOrganizationRequest from "../../../API/GetOrganizationRequest";
import IResponse from "../../../API/IResponse";
import IOrganization from "../../../API/GetOrganizationRequest/IOrganization";
import IApp from "../../../lib/IApp";
import GetAppRequest from "../../../API/GetAppRequest";
import CancelSubscriptionRequest from "../../../API/CancelSubscriptionRequest";

export default class CancelSubscriptionSection extends React.Component<ICancelSubscriptionSectionProps, ICancelSubscriptionSectionState> {
    constructor(props : ICancelSubscriptionSectionProps) {
        super(props);
        this.state = {
            organization: null,
            app: null,
            shouldCancelSubscription: false,
            shouldGetApp: false,
        }
        this.handleCancelSubscription = this.handleCancelSubscription.bind(this);
        this.onOrganization = this.onOrganization.bind(this);
        this.onApp = this.onApp.bind(this);
    }

    render() {
        return (
            <>
                <GetOrganizationRequest
                    send
                    organizationId={this.props.organizationId}
                    onComplete={this.onOrganization} />
                <GetAppRequest
                    send={this.state.shouldGetApp}
                    id={this.state.organization?.apps[0] as string}
                    onComplete={this.onApp} />
                <CancelSubscriptionRequest
                    send={this.state.shouldCancelSubscription}
                    subscriptionId={this.state.app?.stripeSubscriptionId as string}
                    onComplete={this.handleCancelSubscription}
                    />
                <BasicSectionTitle>Cancel Subscription</BasicSectionTitle>
                {this.state.app ? <Button onClick={this.handleCancelSubscription}>Cancel Subscription</Button> : null}
            </>
        )
    }

    onOrganization(response : IResponse<IOrganization>) {
        this.setState({
            organization: response.data,
            shouldGetApp: true
        })
    }

    onApp(response: IResponse<IApp>) {
        console.log(response.data);
        this.setState({
            app: response.data
        })
    }

    handleCancelSubscription() {
        if (this.state.app) {
            this.setState({
                shouldCancelSubscription: true,
            })
        }
    }
}