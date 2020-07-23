import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import { ConnectedProps, connect } from "react-redux";
import IState from "../../Store/IState";
import SearchableDropdownInput from "../../Components/SearchableDropdownInput";
import IconType from "../../Components/Icon/IconTypes";
import IFormValue from "../../Components/FormInput/IFormValue";
import IOrganizationPageState from "./IOrganizationPageState";
import IResponse from "../../API/IResponse";
import IGetOrganizationNameResponse from "../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../API/GetOrganizationNameRequest";
import BasicSectionTitle from "../../Layouts/BasicLayout/BasicSectionTitle";
import BuildingSection from "./BuildingSection";

class OrganizationPage extends React.Component<Props, IOrganizationPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            organizationNames: [],
            currentOrganizationId: "",
            currentOrganizationName: "Organization",
            shouldGetName: false
        }
        this.onOrganizationChange = this.onOrganizationChange.bind(this);
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <BasicLayout title={this.state.currentOrganizationName}>
                <GetOrganizationNameRequest
                    send={this.state.shouldGetName} 
                    onComplete={this.onOrganizationName}
                    onError={this.onError}
                    organizationId={this.state.currentOrganizationId} />
                <SearchableDropdownInput 
                    id="organizations"
                    label="Organization"
                    values={this.props.user.organizations ? this.props.user.organizations : []} 
                    icon={IconType.BuildingSolid} 
                    placeholder="Organization..."
                    onChange={this.onOrganizationChange}
                    />
                {
                    this.state.currentOrganizationName === "Organization" ?
                        <BasicSectionTitle>Please Select An Organization</BasicSectionTitle> :
                        <BuildingSection organizationId={this.state.currentOrganizationId} />
                }
            </BasicLayout>
        )
    }

    onOrganizationChange(index : IFormValue<number>) {
        this.setState({
            currentOrganizationId: this.props.user.organizations[index.value],
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