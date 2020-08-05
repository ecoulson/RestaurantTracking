import React from "react";
import "./index.css";
import IOrganizationNameProps from "./IOrganizationNameProps";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import IResponse from "../../../../API/IResponse";
import IOrganizationNameState from "./IOrganizationNameState";

export default class OrganizationName extends React.Component<IOrganizationNameProps, IOrganizationNameState> {
    constructor(props : IOrganizationNameProps) {
        super(props);
        this.state = {
            organizationName: null
        }
        this.handleOrganizationName = this.handleOrganizationName.bind(this);
    }

    render() {
        return !this.state.organizationName ?
            <>
                <GetOrganizationNameRequest 
                    send
                    organizationId={this.props.organizationId}
                    onComplete={this.handleOrganizationName} />
                <div className="organization-name-loader"></div>
                <div id="organization-name-loader-2" className="organization-name-loader"></div>
            </> :
            <>
                <h1 className="organization-name">{this.state.organizationName}</h1>
            </>
    }

    handleOrganizationName(response: IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }
}