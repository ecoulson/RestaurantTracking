import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import { ConnectedProps, connect } from "react-redux";
import IState from "../../Store/IState";
import IOrganizationPageState from "./IOrganizationPageState";
import IResponse from "../../API/IResponse";
import IGetOrganizationNameResponse from "../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../API/GetOrganizationNameRequest";
import BuildingSection from "./BuildingSection";
import DropdownInput from "../../Components/DropdownInput";
import Button from "../../Components/Button";
import AppHistory from "../../AppHistory";
import BillingSection from "./BillingSection";

class OrganizationPage extends React.Component<Props, IOrganizationPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            organizationNames: [],
            currentOrganizationId: props.user.organizations[0] ? props.user.organizations[0] : "",
            currentOrganizationName: "Manage",
            shouldGetName: false
        }
        this.onOrganizationChange = this.onOrganizationChange.bind(this);
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <BasicLayout title="Manage">
                <GetOrganizationNameRequest
                    send={this.state.shouldGetName} 
                    onComplete={this.onOrganizationName}
                    onError={this.onError}
                    organizationId={this.state.currentOrganizationId} />
                {
                    this.state.currentOrganizationId === "" ?
                        <>
                            Visit the Marketplace to set up a contact log.
                            <Button onClick={() => AppHistory.push("/marketplace")}>Visit Marketplace</Button>
                        </> :
                        <>
                            <DropdownInput 
                                id="organizations"
                                label="Organization"
                                value={this.state.currentOrganizationId}
                                values={this.props.user.organizations ? this.props.user.organizations : []} 
                                onChange={this.onOrganizationChange}/>
                            <BuildingSection organizationId={this.state.currentOrganizationId} />
                            <BillingSection organizationId={this.state.currentOrganizationId} />
                        </>
                        
                }
            </BasicLayout>
        )
    }

    onOrganizationChange(organizationId : string, index: number) {
        this.setState({
            currentOrganizationId: organizationId,
            shouldGetName: true
        })
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            shouldGetName: false,
            currentOrganizationName: response.data.organizationName
        })
    }

    onError() {
        this.setState({
            shouldGetName: false
        })
    }
}

const mapState = (state : IState) => {
    return {
        user: state.user
    }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(OrganizationPage)