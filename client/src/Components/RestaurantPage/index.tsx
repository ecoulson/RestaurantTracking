import Logo from '../Logo';
import RestaurantName from '../RestaurantName';
import Instructions from '../Instructions';
import Form from '../Form';
import Submit from '../Submit';
import React from "react";
import PhoneInput from '../PhoneInput';
import EmailInput from '../EmailInput';
import IRestaurantPageState from './IRestaurantPageState';
import IPageProps from '../../IPageProps';
import ICheckInBody from '../../lib/ICheckInBody';
import ApplicationState from '../../Page';
import Axios from "axios";
import FormValue from '../FormInput/FormValue';
import IFormValue from '../FormInput/IFormValue';

export default class RestaurantPage extends React.Component<IPageProps, IRestaurantPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            email: new FormValue("", false),
            phoneNumber: new FormValue("", false),
            isComplete: false,
            errorMessage: "",
            restaurantName: "",
            isSubmitting: false
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getRestaurantName();
    }

    async getRestaurantName() {
        const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
        if (!restaurantId) {
            this.setState({
                restaurantName: "ERROR"
            });
        } else {
            try {
                const response = await Axios.get(`/restaurant/${restaurantId}/`);
                console.log(response);
                this.props.setRestaurantName!(response.data.data.restaurant.name);
                this.setState({
                    restaurantName: response.data.data.restaurant.name
                })
            } catch (error) {
                this.setState({
                    restaurantName: "ERROR"
                })
            }
        }
    }

    render() {
        return (
            <>
                <Logo />
                <RestaurantName>{this.state.restaurantName}</RestaurantName>
                <Instructions>Please enter one of the following:</Instructions>
                <Form isSubmitting={this.state.isSubmitting}>
                    <EmailInput onChange={this.handleEmailChange} />
                    <p className="or">Or</p>
                    <PhoneInput onChange={this.handlePhoneChange} />
                    <Submit onClick={this.handleSubmit} visible={this.state.isComplete}/>
                </Form>
            </>
        )
    }

    private handleEmailChange(email : IFormValue<string>) {
        this.setState({
            email,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private isComplete() {
        if (this.state.email.value === "") {
            return this.state.phoneNumber.valid
        }
        if (this.state.phoneNumber.value === "") {
            return this.state.email.valid;
        }
        return this.state.email.valid && this.state.phoneNumber.valid
    }

    private handlePhoneChange(phoneNumber : IFormValue<string>) {
        this.setState({
            phoneNumber,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private handleSubmit() {
        if (this.state.isComplete) {
            this.setState({
                isSubmitting: true
            })
            const checkInBody : ICheckInBody = {
                restaurantId: this.props.restaurantId!,
            }
            if (this.state.email.valid) {
                checkInBody.email = this.state.email.value;
            }
            if (this.state.phoneNumber.valid) {
                checkInBody.number = this.state.phoneNumber.value;
            }
            if (this.state.isComplete) {
                this.submitCheckin(checkInBody)
            }
        }
    }

    private async submitCheckin(checkInBody : ICheckInBody) {
        try {
            const res = await Axios.post("/check_in/", checkInBody);
            if (res.data.success) {
                this.props.setPage!(ApplicationState.Success)
            } else {
                this.props.setPage!(ApplicationState.Failure)
            }
        } catch (error) {
            this.props.setPage!(ApplicationState.Failure)
        }
    }
}