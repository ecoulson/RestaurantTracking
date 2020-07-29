import React from "react";
import BasicLayout from "../../../Layouts/BasicLayout";
import IState from "../../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Form from "../../../Components/Form";
import Button from "../../../Components/Button";
import RegisterAppRequest from "../../../API/RegisterAppRequest";
import IPurchaseContactLogsPageState from "./IPurchaseContactLogsPageState";
import IPurchaseContactLogsPageProps from "./IPurchaseContactLogsPageProps";
import AppHistory from "../../../AppHistory";
import "./index.css";
import AddLocation from "./AddLocation";
import Cart from "../../../Components/Cart";

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
                <Form id="contact-log-setup" onSubmit={this.onSubmit}>
                    <RegisterAppRequest
                        send={this.state.send}
                        onComplete={this.onComplete}
                        onError={this.onError}
                        organizationId={this.state.organizationId} />
                    <div className="contact-log-checkout">
                        <AddLocation />
                        <Cart />
                    </div>
                    <Button>Checkout</Button>
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