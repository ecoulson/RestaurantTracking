import React from "react";
import "./index.css";
import IOrganizationNameProps from "./IOrganizationNameProps";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import IResponse from "../../../../API/IResponse";
import IOrganizationNameState from "./IOrganizationNameState";
import IState from "../../../../Store/IState";
import { getOrganizationName, setOrganizationName } from "../../../../Store/CheckInApp/OrganizationName/actions";
import { connect, ConnectedProps } from "react-redux";

class OrganizationName extends React.Component<Props, IOrganizationNameState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            organizationName: null
        }
        this.handleOrganizationName = this.handleOrganizationName.bind(this);
    }

    componentWillMount() {
        if (!this.props.organizationName.fetched) {
            this.props.getOrganizationName(this.props.organizationId)
        }
    }

    render() {
        return !this.props.organizationName.fetched ?
            <>
                <GetOrganizationNameRequest 
                    send={this.props.organizationName.fetching}
                    organizationId={this.props.organizationName.organizationId as string}
                    onComplete={this.handleOrganizationName} />
                <div className="organization-name-loader"></div>
                <div id="organization-name-loader-2" className="organization-name-loader"></div>
            </> :
            <>
                <h1 className="organization-name">{this.props.organizationName.name}</h1>
            </>
    }

    handleOrganizationName(response: IResponse<IGetOrganizationNameResponse>) {
        this.props.setOrganizationName(response.data.organizationName)
    }
}


const mapState = (state : IState) => {
    return {
        organizationName: state.checkInApp.organizationName
    }
}

const mapDispatch = {
    getOrganizationName: getOrganizationName,
    setOrganizationName: setOrganizationName
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IOrganizationNameProps

export default connector(OrganizationName);