import React from "react";
import BasicLayout from "../../../Layouts/BasicLayout";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import IState from "../../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import SearchableDropdownInput from "../../../Components/SearchableDropdownInput";
import IconType from "../../../Components/Icon/IconTypes";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Form from "../../../Components/Form";
import Button from "../../../Components/Button";
import RegisterAppRequest from "../../../API/RegisterAppRequest";
import IPurchaseContactLogsPageState from "./IPurchaseContactLogsPageState";
import IPurchaseContactLogsPageProps from "./IPurchaseContactLogsPageProps";
import AppHistory from "../../../AppHistory";

class PurchaseContactLogsPage extends React.Component<Props, IPurchaseContactLogsPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            organizationId: "",
            send: false
        }
        this.onOrganizationChange = this.onOrganizationChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                <BasicSectionTitle>Add Contact Log To Selected Organization</BasicSectionTitle>
                <Form onSubmit={this.onSubmit}>
                    <RegisterAppRequest
                        send={this.state.send}
                        onComplete={this.onComplete}
                        onError={this.onError}
                        organizationId={this.state.organizationId} />
                    <SearchableDropdownInput 
                        id="organizations"
                        label="Organization"
                        values={this.props.organizations ? this.props.organizations : []} 
                        icon={IconType.BuildingSolid} 
                        placeholder="Organization..."
                        onChange={this.onOrganizationChange} />
                    <Button submit>Add</Button>
                </Form>
            </BasicLayout>
        )
    }

    onOrganizationChange(index : IFormValue<number>) {
        this.setState({
            organizationId: this.props.organizations[index.value],
        })
    }

    onSubmit() {
        this.setState({
            send: true
        })
    }

    onComplete() {
        this.props.showSuccess("Registered contact logs app", 5000)
        AppHistory.push("/dashboard")
    }

    onError() {
        this.setState({
            send: false
        })
    }
}

const mapState = (state : IState) => {
    return {
        organizations: state.user.organizations
    }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IPurchaseContactLogsPageProps;

export default connector(PurchaseContactLogsPage)