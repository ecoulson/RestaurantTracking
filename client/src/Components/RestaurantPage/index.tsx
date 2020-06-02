import Logo from '../Logo';
import RestaurantName from '../RestaurantName';
import Instructions from '../Instructions';
import Form from '../Form';
import Submit from '../Submit';
import React from "react";
import PhoneInput from '../PhoneInput';
import EmailInput from '../EmailInput';
import IPhoneNumber from '../PhoneInput/IPhoneNumber';
import IEmail from '../EmailInput/IEmail';
import IRestaurantPageState from './IRestaurantPageState';
import Toast from '../Toast';
import IRestaurantPageProps from './IRestaurantPageProps';
import ICheckInBody from '../../lib/ICheckInBody';
import ApplicationState from '../../ApplicationState';
import Axios from "axios";

export default class RestaurantPage extends React.Component<IRestaurantPageProps, IRestaurantPageState> {
    constructor(props: IRestaurantPageProps) {
        super(props);
        this.state = {
            email: { email: "", valid: false },
            phoneNumber: { number: "", valid: false },
            isComplete: false,
            errorMessage: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <>
                <Toast message={this.state.errorMessage} />
                <Logo />
                <RestaurantName />
                <Instructions>Please enter one of the following:</Instructions>
                <Form>
                    <EmailInput onChange={this.handleEmailChange} />
                    <p className="or">Or</p>
                    <PhoneInput onChange={this.handlePhoneChange} />
                    <Submit onClick={this.handleSubmit} visible={this.state.isComplete}/>
                </Form>
            </>
        )
    }

    private handleEmailChange(email : IEmail) {
        this.setState({
            email,
            isComplete: email.valid || this.state.phoneNumber.valid
        })
    }

    private handlePhoneChange(phoneNumber : IPhoneNumber) {
        this.setState({
            phoneNumber,
            isComplete: phoneNumber.valid || this.state.email.valid
        })
    }

    private handleSubmit() {
        const checkInBody : ICheckInBody = {
            restaurantId: this.props.restaurantId,
        }
        if (this.state.email.valid) {
            checkInBody.email = this.state.email.email;
        } else if (this.state.email.email !== "") {
            this.setState({
                errorMessage: "Please enter a valid email"
            });
            this.clearToast();
            return;
        }

        if (this.state.phoneNumber.valid) {
            checkInBody.number = this.state.phoneNumber.number;
        } else if (this.state.phoneNumber.number !== "") {
            this.setState({
                errorMessage: "Please enter a valid phone number"
            });
            this.clearToast();
            return;
        }
        this.submitCheckin(checkInBody)
    }

    private async submitCheckin(checkInBody : ICheckInBody) {
        try {
            const res = await Axios.post("/check_in/", checkInBody);
            if (res.data.success) {
                this.props.setApplicationState(ApplicationState.Success)
            } else {
                this.props.setApplicationState(ApplicationState.Failure)
            }
        } catch (error) {
            this.props.setApplicationState(ApplicationState.Failure)
        }
    }

    private clearToast() {
        setTimeout(() => {
            this.setState({
                errorMessage: ""
            });
        }, 5000)
    }
}