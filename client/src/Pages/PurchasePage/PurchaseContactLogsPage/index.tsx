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

class PurchaseContactLogsPage extends React.Component<Props> {
    constructor(props : Props) {
        super(props);
        this.onOrganizationChange = this.onOrganizationChange.bind(this);
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                <BasicSectionTitle>Add Contact Log To Selected Organization</BasicSectionTitle>
                <Form>
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
            currentOrganizationId: this.props.organizations[index.value],
            shouldGetName: true
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

type Props = PropsFromRedux;

export default connector(PurchaseContactLogsPage)