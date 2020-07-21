import Logo from '../../../Components/Logo';
import OrganizationName from '../OrganizationName';
import Instructions from '../Instructions';
import Form from '../../../Components/Form';
import Button from '../../../Components/Button';
import React from "react";
import PhoneInput from '../../../Components/PhoneInput';
import EmailInput from '../../../Components/EmailInput';
import IRestaurantPageState from './IRestaurantPageState';
import IPageProps from '../../../IPageProps';
import ICheckInBody from '../../../lib/ICheckInBody';
import ApplicationState from '../../../Page';
import Axios from "axios";
import FormValue from '../../../Components/FormInput/FormValue';
import IFormValue from '../../../Components/FormInput/IFormValue';
import Toast from '../../../Components/Toast';
import ToastType from '../../../Components/Toast/ToastType';
import SlideSwitch from '../../../Components/SlideSwitch';
import LegalContainer from '../LegalContainer';
import Icon from '../../../Components/Icon';
import IconType from '../../../Components/Icon/IconTypes';
import CheckInType from '../../../lib/CheckInInputType';

export default class RestaurantPage extends React.Component<IPageProps, IRestaurantPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            email: new FormValue("", false),
            phoneNumber: new FormValue("", false),
            isComplete: false,
            errorMessage: "",
            restaurantName: "",
            isSubmitting: false,
            selected: CheckInType.Phone
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSlideSwitchChange = this.handleSlideSwitchChange.bind(this);
    }

    async componentDidMount() {
        await this.getRestaurantName();
    }

    async getRestaurantName() {
        const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
        if (!restaurantId) {
            this.setState({
                errorMessage: `No restaurant id in url ${restaurantId}`
            });
        } else {
            try {
                const response = await Axios.get(`/api/restaurant/${restaurantId}/`);
                if (!response.data.success) {
                    this.setState({
                        errorMessage: `Failed to find restaurant with id ${restaurantId}`
                    });
                } else {
                    document.title = "Check In: " + response.data.data.restaurant.name;
                    this.props.setRestaurantName!(response.data.data.restaurant.name);
                    this.setState({
                        restaurantName: response.data.data.restaurant.name
                    })
                }
            } catch (error) {
                this.setState({
                    errorMessage: `Failed to find restaurant with id ${restaurantId}`
                });
            }
        }
    }

    render() {
        return (
            <>
                <Toast type={ToastType.Error} message={this.state.errorMessage} />
                <Logo dark/>
                <OrganizationName>{this.state.restaurantName}</OrganizationName>
                <Instructions>Please enter one of the following:</Instructions>
                <Form onSubmit={this.handleSubmit} isSubmitting={this.state.isSubmitting}>
                    <SlideSwitch optionWidth={120} onChange={this.handleSlideSwitchChange}>
                        <Icon color="white" icon={IconType.Phone}/>
                        <Icon color="white" icon={IconType.Mail}/>
                    </SlideSwitch>
                    {
                        this.state.selected === CheckInType.Phone ?
                            <PhoneInput id="phone" hoverColor="white" iconColor="#707070" dark onChange={this.handlePhoneChange} /> :
                            <EmailInput id="email" hoverColor="white" iconColor="#707070" dark onChange={this.handleEmailChange} />

                    }
                    <Button 
                        dark 
                        submit 
                        visible={this.state.isComplete}>
                            Submit
                    </Button>
                </Form>
                <LegalContainer />
            </>
        )
    }

    private handleSlideSwitchChange(id : number) {
        this.setState({
            selected: id
        })
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
                this.submitCheckIn(checkInBody)
            }
        }
    }

    private async submitCheckIn(checkInBody : ICheckInBody) {
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