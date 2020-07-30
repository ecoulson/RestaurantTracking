import React from "react";
import BasicLayout from "../../../Layouts/BasicLayout";
import IState from "../../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import Form from "../../../Components/Form";
import Button from "../../../Components/Button";
import IPurchaseContactLogsPageState from "./IPurchaseContactLogsPageState";
import IPurchaseContactLogsPageProps from "./IPurchaseContactLogsPageProps";
import "./index.css";
import Cart from "../../../Components/Cart";
import ContactLogSetup from "./ContactLogSetup";

class PurchaseContactLogsPage extends React.Component<Props, IPurchaseContactLogsPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            page: 0
        }
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                {this.state.page > 0 ? <Button onClick={this.handleBackClick}>Back</Button> : null }
                <Form id="contact-log-setup">
                    <div className="contact-log-checkout">
                        <ContactLogSetup page={this.state.page} />
                        <Cart />
                    </div>
                    {this.getButtons()}
                </Form>
            </BasicLayout>
        )
    }

    handleNextClick() {
        this.setState({
            page: this.state.page + 1
        })
    }

    handleBackClick() {
        this.setState({
            page: this.state.page - 1
        })
    }

    getButtons() {
        switch (this.state.page) {
            case 0:
                return <Button onClick={this.handleNextClick}>Next</Button>
            case 1:
                return <Button onClick={this.handleNextClick}>Checkout</Button>
            case 2:
                return <Button onClick={this.handleNextClick}>Continue</Button>
        }
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